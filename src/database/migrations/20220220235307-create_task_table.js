/**
 * This file handles the migration for the task table.
 *
 * @author Jeremy Krovitz
 */

'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Task', {
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
            UserId :{
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'User',
                    key: 'UserId'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Task');
    }
};