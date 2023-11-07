const { INTEGER, STRING } = require('sequelize');
const sequelize = require('../databases/sequelize');

const Cart = sequelize.define('cart', {
  cartId: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  itemsNumber: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  totalPrice: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Cart;
