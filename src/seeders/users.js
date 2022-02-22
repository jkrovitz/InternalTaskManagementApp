/**
 * This file handles seeding of users.
 *
 * @author Jeremy Krovitz
 */


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      firstName: 'Jeremy',
      lastName: 'Krovitz',
      email: 'test@example.com',
      username: 'test',
      password: '34590293!98349273',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'William',
      lastName: 'Lewandowski',
      email: 'test2@example.com',
      username: 'test2',
      password: 'jkldsfj234090293@#!@',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};