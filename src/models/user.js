import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt';
import environment from '../config/environment'

export default (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.RefreshToken = User.hasOne(models.RefreshToken)
            User.Roles = User.hasMany(models.Roles)
        }

        // Takes a password and hashes it with the bcrypt algorithm
        static async hashPassword(password) {
            return bcrypt.hash(password, environment.saltRounds) // first argument is a string which will be our password and the second argument is going to be the saltOrRounds, which can be a string or number and it returns a Promise that resolves to a string, which will be the hashstring. We will get the value for the SaltOrRounds by importing environment from '../config/environment' at the top of the file.
        }

        static async createNewUser({
            email,
            password,
            roles,
            username,
            firstName,
            lastName,
            refreshToken
        }) {
            return sequelize.transaction(async() => {
                let rolesToSave = []; // empty array

                // roles = ["customer", "admin"]
                //rolesToSave = [{role: "customer"}, {role: "admin"}]
                if (roles && Array.isArray(roles)) { // if roles is defined and if roles is an array
                    rolesToSave = roles.map(role => ({ role })); // rolesToSave = roles.map and we're going to convert the role to an object
                }

                await User.create({
                    email,
                    password,
                    username,
                    firstName,
                    lastName,
                    RefreshToken: { token: refreshToken }, // this is how we create an associated refreshToken with this user. We pass an object specifying the token.
                    Roles: rolesToSave, // needs to be an array of objects; the parameter roles is just going to be an array of strings, so we need to convert that array of string to this array of objects
                }, {
                    include: [User.RefreshToken, User.Roles]
                })

                // we have added all of the properties to the users table
                // we need to find a way to create this user with roles and a refreshToken and that's where User.RefreshToken = User.hasOne(models.RefreshToken) and User.Roles = User.hasMany(models.Roles) are going to help us.

            })
        }
    }

    // Defining the properties of the user model
    User.init({
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Not a valid email address',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: {
                len: {
                    args: [2, 50], // min and max number of characters
                    msg: 'Username must contain between 2 and 50 characters',
                },
            },
        },
        firstName: {
            type: DataTypes.STRING(50),
            validate: {
                len: {
                    args: [3, 50], // min and max number of characters
                    msg: 'First name must contain between 3 and 50 characters',
                },
            },
        },
        lastName: {
            type: DataTypes.STRING(50),
            validate: {
                len: {
                    args: [3, 50], // min and max number of characters
                    msg: 'Last name must contain between 3 and 50 characters',
                },
            },
        },
    }, {
        sequelize,
        modelName: 'User',
        defaultScope: { attributes: { exclude: ['password'] } },
        scopes: {
            withPassword: {
                attributes: { include: ['password'] }
            }
        }
    })

    // user = await User.findOne({where: {email: 'test@example.com'}})
    // user.email, user.username, user.firstName, user.lastName, user.password (even if the password is hashed, we don't want to expose that password to anyone. When we need the password, we're going to pass in scope, and say, "hey, include in the query the password but otherwise, we're not going to include the password")
    // user.comparePasswords('test123#') // if this is the same as the hashed password, true is returned otherwise false is returned
    User.prototype.comparePasswords = async function(password) {
        return bcrypt.compare(password, this.password) // returns a promise of whether the passed password is the same as the hashed password
    }

    // This hook is going to guarantee that every user we save, the password is going to be hashed, so we will NEVER be saving a plain text password.
    User.beforeSave(async(user, options) => {
        const hashedPassword = await User.hashPassword(user.password)
        user.password = hashedPassword
    })

    return User;
}