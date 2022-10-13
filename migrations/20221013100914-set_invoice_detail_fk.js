'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('invoiceDetails', {
      fields: ['invoiceId'],
      type: 'foreign key',
      name: 'invoicedetail_set_invoices_fk',
      references: {
        table: 'invoices',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('invoiceDetails', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'invoicedetail_set_product_fk',
      references: {
        table: 'products',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('invoiceDetails', {
      fields: ['invoiceId'],
      type: 'foreign key',
      name: 'invoicedetail_set_invoices_fk',
      references: {
        table: 'invoices',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('invoiceDetails', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'invoicedetail_set_product_fk',
      references: {
        table: 'products',
        field: 'id'
      }
    });

  }
};
