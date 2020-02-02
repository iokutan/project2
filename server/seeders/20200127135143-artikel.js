'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Artikel', [
      {
        artikel_id: '13881993-b796-4168-b017-2b15b164086c',
        title: 'fathers day',
        body: 'yeaah fathers day',
        image_url: 'some_picture_image.jpg',
        category_id: '1997e993-b796-4168-b017-2b15b164086c',
        creationDate: new Date(),
        updatedOn: new Date(),
      },
      {
        artikel_id: '15881993-b796-4168-b017-2b15b164086c',
        title: 'mothers day',
        body: 'yeaah mothers day',
        image_url: 'some_picture_image.jpg',
        category_id: '1997e993-b796-4168-b017-2b15b164086c',
        creationDate: new Date(),
        updatedOn: new Date(),
      },
      {
        artikel_id: '12881993-b796-4168-b017-2b15b164086c',
        title: 'get one buy one',
        body: 'this really interesting text from this story',
        image_url: 'some_picture_image.jpg',
        category_id: '1997e993-b796-4168-b017-2b15b164086c',
        creationDate: new Date(),
        updatedOn: new Date(),
      },
      {
        artikel_id: '11881993-b796-4168-b017-2b15b164086c',
        title: 'valentine',
        body: 'get to be remembered',
        image_url: 'switzerland.jpg',
        category_id: '1998e993-b796-4168-b017-2b15b164086c',
        creationDate: new Date(),
        updatedOn: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Artikel', null, {});
  }
};
