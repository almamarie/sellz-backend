const { STRING, INTEGER, FLOAT, TEXT } = require('sequelize');
const sequelize = require('../databases/sequelize');

const Product = sequelize.define('product', {
  productId: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  name: {
    type: STRING,
    allowNull: false,
  },

  coverPhoto: {
    type: STRING,
    allowNull: false,
  },

  otherPhotos: {
    type: STRING,
    allowNull: false,
  },

  unitPrice: {
    type: FLOAT,
    allowNull: false,
  },

  description: {
    type: TEXT,
    allowNull: false,
  },

  quantityInStock: {
    type: INTEGER,
    allowNull: false,
  },
});

Product.prototype.format = function () {
  return {
    productId: this.productId,
    name: this.name,
    coverPhoto: this.coverPhoto,
    otherPhotos: JSON.parse(this.otherPhotos).split('[]'),
    description: this.description,
    unitPrice: this.unitPrice,
    quantityInStock: this.quantityInStock,
  };
};

module.exports = Product;
