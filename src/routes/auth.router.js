const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signin', authController.signIn);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/passwordUpdate',
  authController.requireAuth,
  authController.updatePassword
);

module.exports = router;
