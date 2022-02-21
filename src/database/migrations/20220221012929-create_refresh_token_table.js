'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('RefreshToken', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            token: {
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
            UserId: {
                type: Sequelize.INTEGER,
                references: { model: { tableName: 'RefreshToken' }, key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('RefreshToken');
    }
};