/**
 * This file handles the migration for the user table.
 *
 * @author Jeremy Krovitz
 */

'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('User', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
                // We cannot include validate in a migration; Postgres is not capable of email validation
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING(50),
                unique: true,
            },
            firstName: {
                type: Sequelize.STRING(50),
            },
            lastName: {
                type: Sequelize.STRING(50),
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
        return queryInterface.dropTable('User');
    }
};