'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class table extends Model {}
  table.init({
    tableNumber: DataTypes.INTEGER,
    status: DataTypes.INTEGER // 0 free 1 join 2 full 3 check bill
  }, {
    sequelize,
    modelName: 'table', 
  });
  return table;
};