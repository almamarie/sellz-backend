const { STRING, INTEGER, NUMBER, UUID } = require('sequelize');
const sequelize = require('../databases/sequelize');
const { generateId } = require('../utils/generateId');

const ProductReview = sequelize.define('product_review', {
  productReviewId: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => generateId(),
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
