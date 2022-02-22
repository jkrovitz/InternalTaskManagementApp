'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Tasks', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            task: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: false,
            },
            taskDetails: {
              type: Sequelize.TEXT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            // UserId: {
            //     type: Sequelize.INTEGER,
            //     references: { model: { tableName: 'Users' }, key: 'id' },
            //     // onUpdate: 'CASCADE',
            //     // onDelete: 'CASCADE',
            // }
            UserId :{
                type: DataTypes.INTEGER,
                references: {
                    model: 'models.User',
                    key: 'id'
                }
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Tasks');
    }
};