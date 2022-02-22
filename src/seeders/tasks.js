/**
 * This file handles seeding of tasks.
 *
 * @author Jeremy Krovitz
 */


'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Task', [{
      task: 'Build an app',
      taskDetails: 'Build an internal task management application',
      // UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {task: 'Mow the lawn',
      taskDetails: 'Make sure to get the front and back',
      // UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()}], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Task', null, {});
  }
};

