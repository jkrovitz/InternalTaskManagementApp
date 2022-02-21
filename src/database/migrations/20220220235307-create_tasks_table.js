'use strict';
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
                references: { model: { tableName: 'Users' }, key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Tasks');
    }
};