'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ArtikelCategory', [
      {
        category_id: '1999e993-b796-4168-b017-2b15b164086c',
        category_name: 'Sale',
        creationDate: new Date(),
        updatedOn: new Date(),
      },
      {
        category_id: '1997e993-b796-4168-b017-2b15b164086c',
        category_name: 'Herren',
        creationDate: new Date(),
        updatedOn: new Date(),
      },
      {
        category_id: '1998e993-b796-4168-b017-2b15b164086c',
        category_name: 'Damen',
        creationDate: new Date(),
        updatedOn: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ArtikelCategory', null, {});
  }
};
