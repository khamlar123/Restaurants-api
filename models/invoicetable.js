'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoiceTable extends Model {}
  invoiceTable.init({
    tableId: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER,
    status: DataTypes.INTEGER // 0 pending 1 complete
  }, {
    sequelize,
    modelName: 'invoiceTable',
  });
  return invoiceTable;
};