import {
    Model,
    DataTypes
} from 'sequelize'

export default (sequelize) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
        }
    }

    Task.init({
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Task'
    })
    return Task;
}