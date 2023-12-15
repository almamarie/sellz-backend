const { STRING, INTEGER } = require('sequelize');
const sequelize = require('../databases/sequelize');

const ProductCategory = sequelize.define('product_category', {
  productCategoryId: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
});

ProductCategory.prototype.format = function () {
  console.log('\n\n\nHere\n\n\n');
  return { productCategoryId: this.productCategoryId, name: this.name };
};

module.exports = ProductCategory;
