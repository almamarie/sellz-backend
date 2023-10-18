const express = require("express");
const UserRouter = require("./user.router");
const AuthRouter = require("./auth.router");
const logger = require("../utils/logger");
const router = express.Router();

router.get("/", (req, res) => {
  logger.info("base API called");
  res.status(200).send({ success: true, body: "Root router reached" });
});

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);

exports.IndexRouter = router;
