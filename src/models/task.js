import {
    Model,
    DataTypes
} from 'sequelize'

export default (sequelize) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User, {foreignKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
        }


        static async createNewTask({task,
                                       taskDetails
                                   }) {
            return sequelize.transaction(() => {

                return Task.create({task,
                    taskDetails
                }, {
                })
            })
        }
    }



    Task.init({
        task: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        taskDetails: {
            type: DataTypes.TEXT
        },
        UserId :{
            type: DataTypes.INTEGER,
        }

    }, {
        sequelize,
        modelName: 'Task'
    })
    return Task;
}