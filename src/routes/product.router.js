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

router.patch(
  '/:productId',
  requireAuth('patch:product'),
  productController.fetchProduct,
  productController.uploadProductImages,
  productController.patchProduct
);

// get a product
router.get(
  '/:productId',

  productController.fetchProduct,
  productController.getProduct
);

// get all products
router.get('/', productController.getAllProducts);

// delete a product
router.delete(
  '/:productId',
  requireAuth('delete:product'),
  productController.fetchProduct,
  productController.deleteProduct
);

module.exports = router;
