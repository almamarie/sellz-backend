const express = require('express');
const userController = require('../controllers/userController');
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

module.exports = router;
