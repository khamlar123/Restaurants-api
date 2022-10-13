'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMenu extends Model {}
  UserMenu.init({
    userId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserMenu',
  });
  return UserMenu;
};