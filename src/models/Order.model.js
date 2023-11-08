const { STRING, FLOAT, UUID } = require('sequelize');
const sequelize = require('../databases/sequelize');
const { generateId } = require('../utils/generateId');

const Order = sequelize.define('order', {
  orderId: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => generateId(),
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
