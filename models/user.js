'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    url: DataTypes.STRING,
    status:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};