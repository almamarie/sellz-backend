const express = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const { requireAuth } = require('../controllers/authController');
const router = express.Router();

router.post('/', userController.postCreateUser);
router.patch('/:userId/', requireAuth, userController.patchUpdateUser);
router.patch(
  '/:userId/profile-picture/',
  requireAuth,
  userController.uploadPhoto,
  userController.patchUpdateProfilePhoto
);
router.get('/:userId', requireAuth, userController.getUser);
router.delete('/:userId', requireAuth, userController.deleteUser);

// product routes

// create a new product
router.post(
  '/:userId/products/',
  requireAuth,
  userController.fetchUser('GET'),
  productController.uploadProductImages,
  productController.postCreateProduct
);

// get a product
router.get(
  '/:userId/products/:productId',
  requireAuth,
  productController.fetchProduct,
  productController.getProduct
);

router.get(
  '/:userId/products/',
  requireAuth,
  userController.fetchUser('GET'),
  productController.getAllProducts
);

// delete a product
router.delete(
  '/:userId/products/:productId',
  requireAuth,
  productController.fetchProduct,
  productController.deleteProduct
);

module.exports = router;
