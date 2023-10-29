const { INTEGER, FLOAT } = require("sequelize");
const sequelize = require("../databases/sequelize");

const OrderItem = sequelize.define("order_item", {
  orderItemId: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  quantity: {
    type: INTEGER,
    allowNull: false,
  },

  price: {
    type: FLOAT,
    allowNull: false,
  },
});

module.exports = OrderItem;
