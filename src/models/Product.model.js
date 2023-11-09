const { STRING, INTEGER, FLOAT, TEXT, UUID } = require('sequelize');
const sequelize = require('../databases/sequelize');
const { generateId } = require('../utils/generateId');
const User = require('./user');

const Product = sequelize.define(
  'product',
  {
    productId: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
      // unique: true,
      defaultValue: () => generateId(),
    },

    userId: {
      type: UUID,
      allowNull: true,
      references: {
        model: User,
        key: 'userId',
      },
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
      type: TEXT,
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

    rating: {
      type: FLOAT,
      allowNull: false,
      defaultValue: 0,
      validator: {
        max: 5,
        min: 0,
      },
    },
  },

  {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'name'],
      },
    ],
  }
);

Product.prototype.format = function () {
  return {
    productId: this.productId,
    userId: this.userId,
    name: this.name,
    coverPhoto: this.coverPhoto,
    otherPhotos: JSON.parse(this.otherPhotos).split('[]'),
    description: this.description,
    unitPrice: this.unitPrice,
    quantityInStock: this.quantityInStock,
    rating: this.rating,
  };
};

module.exports = Product;
