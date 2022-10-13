'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addConstraint('productCategories', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'category_set_fk',
      references: {
        table: 'catgories',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('productCategories', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'category_set_fk_product',
      references: {
        table: 'products',
        field: 'id'
      }
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('productCategories', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'category_set_fk',
      references: {
        table: 'catgories',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('productCategories', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'category_set_fk_product',
      references: {
        table: 'products',
        field: 'id'
      }
    });

  }
};
