const { INTEGER } = require("sequelize");
const sequelize = require("../databases/sequelize");

const CartItem = sequelize.define("cart_item", {
  cartItemId: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = CartItem;
