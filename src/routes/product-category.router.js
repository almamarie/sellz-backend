const express = require('express');
const { requireAuth } = require('../controllers/authController');
const productCategoryController = require('../controllers/productCategory.controller');
const router = express.Router();

router.post(
  '/',
  requireAuth(['post:product-category']),
  productCategoryController.postCreate
);

router.get('/all', productCategoryController.getAll);

module.exports = router;
