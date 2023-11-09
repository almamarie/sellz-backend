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

router.post(
  '/:id/products/',
  requireAuth,
  userController.fetchUser('GET'), // used by 1 so far
  productController.uploadProductImages,
  productController.postCreateProduct
);

router.get('/:id/products', requireAuth, productController.getAllProducts);
router.delete('/:id', requireAuth, productController.deleteProduct);

module.exports = router;
