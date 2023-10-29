const { STRING, INTEGER } = require("sequelize");
const sequelize = require("../databases/sequelize");

const ProductCategory = sequelize.define("product_category", {
  productCategoryId: {
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
});

module.exports = ProductCategory;
