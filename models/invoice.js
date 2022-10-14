'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice.init({
    invoiceNo: DataTypes.STRING, 
    userId: DataTypes.INTEGER,
    status: DataTypes.INTEGER, // 0 pending 1 cancel 2 complete
    price: DataTypes.DOUBLE,
    img: DataTypes.STRING,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'invoice',
  });
  return invoice;
};