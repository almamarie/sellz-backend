const express = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const paymentController = require('../controllers/paymentsController');
const { requireAuth } = require('../controllers/authController');
const router = express.Router();

// =================================== USER ROUTES ===================================
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

// =================================== PRODUCT ROUTES ===================================

module.exports = router;

// =================================== PAYMENT ROUTES ===================================

router.post(
  '/:userId/payments/initiate-payment',
  requireAuth,
  paymentController.postInitiatePayment
);
