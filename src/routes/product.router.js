const express = require('express');
const productController = require('../controllers/productController');
const { requireAuth } = require('../controllers/authController');
const router = express.Router();

// create a new product
router.post(
  '/',
  requireAuth('post:product'),
  productController.uploadProductImages,
  productController.postCreateProduct
);

// get a product
router.get(
  '/:productId',
  requireAuth('get:product'),
  productController.fetchProduct,
  productController.getProduct
);

// get all products
router.get(
  '/',
  requireAuth('get:products'),
  // userController.fetchUser('GET'),
  productController.getAllProducts
);

// delete a product
router.delete(
  '/:productId',
  requireAuth('delete:product'),
  productController.fetchProduct,
  productController.deleteProduct
);

module.exports = router;
