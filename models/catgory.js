'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class catgory extends Model {}
  catgory.init({
    name: DataTypes.STRING,
    parrentId: DataTypes.INTEGER,
    img: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'catgory',
  });
  return catgory;
};