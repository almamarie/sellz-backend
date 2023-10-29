const { STRING, INTEGER } = require("sequelize");
const sequelize = require("../databases/sequelize");

const Product = sequelize.define("product", {
  productId: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  name: {
    type: STRING,
    allowNull: false,
  },

  photo: {
    type: STRING,
    allowNull: false,
  },

  unitPrice: {
    type: INTEGER,
    allowNull: false,
  },

  qunatityInStock: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Product;
