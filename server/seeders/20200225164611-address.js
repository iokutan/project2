'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Address', [
      {
          address_id: '12e0e993-b796-4168-b017-2b15b164086c',
          street: 'bahnhofstrasse 222',
          city: 'zürich',
          country: 'switzerland',
          zip: 9999,
          userId: '10e0e993-b796-4168-b017-2b15b164086c',
          creationDate: new Date(),
          updatedOn: new Date(),
      },
      {
          address_id: '14e0e993-b796-4168-b017-2b15b164086c',
          street: 'hofstrasse 12',
          city: 'olten',
          country: 'switzerland',
          zip: 5555,
          userId: '10e0e993-b796-4168-b017-2b15b164086c',
          creationDate: new Date(),
          updatedOn: new Date(),
      }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Address', null, {});
  }
};
