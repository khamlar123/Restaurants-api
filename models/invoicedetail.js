'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoiceDetail extends Model {}
  invoiceDetail.init({
    invoiceId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    status: DataTypes.INTEGER, // 0 pending 1 cooking 2 complete 3 cancel
  }, {
    sequelize,
    modelName: 'invoiceDetail',
  });
  return invoiceDetail;
};