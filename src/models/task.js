import {
    Model,
    DataTypes
} from 'sequelize'

export default (sequelize) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User)
        }
    }

    Task.init({
        task: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Task'
    })
    return Task;
}