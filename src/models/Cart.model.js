const { INTEGER, STRING, UUID } = require('sequelize');
const sequelize = require('../databases/sequelize');
const { generateId } = require('../utils/generateId');

const Cart = sequelize.define('cart', {
  cartId: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => generateId(),
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
