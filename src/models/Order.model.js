const { INTEGER, STRING, FLOAT } = require("sequelize");
const sequelize = require("../databases/sequelize");

const Order = sequelize.define("order", {
  orderId: {
    type: INTEGER,
    autoIncrement: true,
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
