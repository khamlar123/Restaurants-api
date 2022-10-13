'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addConstraint('UserMenus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'UserMenu_set_fk_user',
      references: {
        table: 'Users',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('UserMenus', {
      fields: ['menuId'],
      type: 'foreign key',
      name: 'UserMenu_set_fk_menu',
      references: {
        table: 'Menus',
        field: 'id'
      }
    });


  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('UserMenus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'UserMenu_set_fk_user',
      references: {
        table: 'Users',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('UserMenus', {
      fields: ['menuId'],
      type: 'foreign key',
      name: 'UserMenu_set_fk_menu',
      references: {
        table: 'Menus',
        field: 'id'
      }
    });


  }
};
