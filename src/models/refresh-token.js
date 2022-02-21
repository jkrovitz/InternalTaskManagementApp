import {
    Model,
    DataTypes
} from 'sequelize'

export default (sequelize) => {
    class RefreshToken extends Model {
        static associate(models) {
            RefreshToken.belongsTo(models.User, {
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }

    RefreshToken.init({
        token: {
            type: DataTypes.TEXT // we put this as TYPE text because strings have a limit of 256 characters; the token is a JSON Web Token, so it can have more than 256 characters 
        }
    }, {
        sequelize,
        modelName: 'RefreshToken'
    })
    return RefreshToken;
}