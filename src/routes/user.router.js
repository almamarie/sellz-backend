const express = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const { requireAuth } = require('../controllers/authController');
const router = express.Router();

router.post('/', userController.uploadUserPhoto, userController.postCreateUser);
router.patch('/:userId/', requireAuth, userController.patchUpdateUser);
router.patch(
  '/:userId/profile-picture/',
  requireAuth,
  userController.uploadUserPhoto,
  userController.patchUpdateProfilePhoto
);
router.get('/:userId', requireAuth, userController.getUser);
router.delete('/:userId', requireAuth, userController.deleteUser);

// product routes

router.post(
  '/:userId/products/',
  requireAuth,
  userController.fetchUser('GET'), // used by 1 so far
  productController.uploadProductImages,
  productController.postCreateProduct
);

router.get('/:userId/products', requireAuth, userController.getUser);

module.exports = router;
