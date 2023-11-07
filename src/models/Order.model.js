const { STRING, FLOAT } = require('sequelize');
const sequelize = require('../databases/sequelize');

const Order = sequelize.define('order', {
  orderId: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  totalPrice: {
    type: FLOAT,
    unsigned: true,
    validate: {
      isNonNegetive: true,
    },
  },

  couponCode: {
    type: STRING,
    allowNull: true,
  },

  calculatedPrice: {
    type: FLOAT,
    allowNull: false,
  },
});

module.exports = Order;
