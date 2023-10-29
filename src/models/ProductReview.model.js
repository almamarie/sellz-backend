const { STRING, INTEGER, NUMBER } = require("sequelize");
const sequelize = require("../databases/sequelize");

const ProductReview = sequelize.define("product_review", {
  productReviewId: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  comment: {
    type: STRING,
    allowNull: false,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = ProductReview;
