const { STRING, INTEGER } = require("sequelize");
const sequelize = require("../databases/sequelize");

const ProductCondition = sequelize.define("product_condition", {
  productConditionId: {
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

module.exports = ProductCondition;
