import TestsHelpers from '../tests-helpers'
import models from '../../src/models'
import TestHelpers from '../tests-helpers'

describe('User', () => {

    // set up
    beforeAll(async() => {
        await TestsHelpers.startDb()
    })

    // tare down
    afterAll(async() => {
        await TestsHelpers.stopDb()
    })

    // drops the tables before each test and re-creates them using the models definition, not the migration but the model's definition. That's why it's very important to match the mgirations with the models definitions. 
    beforeEach(async() => {
        await TestsHelpers.syncDb()
    })

    describe('static methods', () => {
        describe('hashPassword', () => {
            it('should hash the password passesd in the arguments', async() => {
                const { User } = models
                const password = 'Test123#'
                const hashedPassword = await User.hashPassword(password)
                expect(password).not.toEqual(hashedPassword);
            })
        })

        describe('createNewUser', () => {
            it('should create a new user successfully', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                    tasks: ['work on report', 'work on write up'],
                    username: 'test',
                    firstName: 'Jeremy',
                    lastName: 'Krovitz',
                    refreshToken: 'test-refresh-token'
                }
                const newUser = await User.createNewUser(data)
                const usersCount = await User.count()
                expect(usersCount).toEqual(1)
                expect(newUser.email).toEqual(data.email)
                expect(newUser.password).toBeUndefined
                expect(newUser.username).toEqual(data.username)
                expect(newUser.firstName).toEqual(data.firstName)
                expect(newUser.lastName).toEqual(data.lastName)
                expect(newUser.RefreshToken.token).toEqual(data.refreshToken)
                expect(newUser.Tasks.length).toEqual(2)
                const savedTasks = newUser.Tasks.map(savedTask => savedTask.task).sort(); // each one of these tasks elements, because remember, tasks is an array of tasks objects,, so each saved tasks is a task object and each task object you can call this task method
                expect(savedTasks).toEqual(data.tasks.sort()) // we use sort to make ure that the two arrays are equal
            })
            it('should error if we create a new user with an invalid email', async() => {
                const { User } = models
                const data = {
                    email: 'test',
                    password: 'Test123#',
                    username: 'test',
                }
                let error;
                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }
                expect(error).toBeDefined();
                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('Not a valid email address')
                expect(errorObj.path).toEqual('email')
            })

            it('should error if we do not pass an email', async() => {
                const { User } = models
                const data = {
                    password: 'Test123#',
                    username: 'Test',
                }
                let error;
                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }
                expect(error).toBeDefined();
                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('Email is required')
                expect(errorObj.path).toEqual('email')
            })

            it('should error if we create two users with the same email', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                    username: 'Test'
                }
                const data2 = {
                    email: 'test@example.com',
                    password: 'Test4321',
                    username: 'Test2'
                }
                let error;
                try {
                    await User.createNewUser(data);
                    await User.createNewUser(data2)
                } catch (err) {
                    error = err;
                }

                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('email must be unique')
                expect(errorObj.path).toEqual('email')
            })

            it('should error if we create a new user with an invalid username', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                    username: 'u',
                }
                let error;
                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }
                expect(error).toBeDefined();
                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('Username must contain between 2 and 50 characters')
                expect(errorObj.path).toEqual('username')
            })

            it('should error if we do not pass a username', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                }
                let error;
                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }
                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('Username is required')
                expect(errorObj.path).toEqual('username')
            })

            it('should error if we create two users with the same username', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                    username: 'test'
                }
                const data2 = {
                    email: 'test2@example.com',
                    password: 'Test4321',
                    username: 'test'
                }
                let error;
                try {
                    await User.createNewUser(data);
                    await User.createNewUser(data2)
                } catch (err) {
                    error = err;
                }
                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('username must be unique')
                expect(errorObj.path).toEqual('username')
            })

            it('should error if we create a user with an invalid first name', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                    username: 'test',
                    firstName: 'Fr',
                }
                let error;
                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }
                expect(error).toBeDefined();
                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('First name must contain between 3 and 50 characters')
                expect(errorObj.path).toEqual('firstName')
            })

            it('should error if we create a user with an invalid last name', async() => {
                const { User } = models
                const data = {
                    email: 'test@example.com',
                    password: 'Test123#',
                    username: 'test',
                    firstName: 'Frank',
                    lastName: 'S'
                }
                let error;
                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }
                expect(error).toBeDefined();
                expect(error.errors.length).toEqual(1)
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('Last name must contain between 3 and 50 characters')
                expect(errorObj.path).toEqual('lastName')
            })
        })
    })

    describe('scopes', () => {
        let user

        beforeEach(async() => {
            user = await TestsHelpers.createNewUser()
        })

        describe('defaultScope', () => {
            it('should return a user without a password', async() => {
                const { User } = models
                const userFound = await User.findByPk(user.id)
                expect(userFound.password).toBeUndefined()

            })
        })

        describe('withPassword', () => {
            it('should return a user with the password', async() => {
                const { User } = models
                const userFound = await User.scope('withPassword').findByPk(user.id)
                expect(userFound.password).toEqual(expect.any(String))
            })
        })
    })

    describe('instance methods', () => {
        describe('comparePasswords', () => {
            let password = 'Test123#'
            let user

            beforeEach(async() => {
                user = await TestHelpers.createNewUser({ password })
            })
            it('should return true if the password is correct', async() => {
                const { User } = models
                const userFound = await User.scope('withPassword').findByPk(user.id)
                const isPasswordCorrect = await userFound.comparePasswords(password)
                expect(isPasswordCorrect).toEqual(true)
            })

            it('should return false if the password is incorrect', async() => {
                const { User } = models
                const userFound = await User.scope('withPassword').findByPk(user.id)
                const isPasswordCorrect = await userFound.comparePasswords("invalidpassword")
                expect(isPasswordCorrect).toEqual(false)
            })
        })
    })

    describe('hooks', () => {
        it('should not attempt to hash the password if it is not given', async() => {
            const user = await TestsHelpers.createNewUser();
            user.email = 'test2@example.com'
            await user.save();
        })
    })
})