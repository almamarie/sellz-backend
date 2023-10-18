const express = require("express");
const userController = require("../controllers/userController");
const { requireAuth } = require("../utils/auth");
const router = express.Router();

router.post("/new", userController.postCreateUser);
router.patch("/:userId/update", requireAuth, userController.postUpdateUser);
router.get("/:userId", requireAuth, userController.getUser);
router.delete("/:userId", requireAuth, userController.deleteUser);

module.exports = router;
