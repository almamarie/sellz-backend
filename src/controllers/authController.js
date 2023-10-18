const User = require("../models/user");
const { comparePasswords, generateJwt } = require("../utils/auth");
const logger = require("../utils/logger");

exports.signIn = async (req, res) => {
  try {
    console.log(req.body);
    logger.info("Signing user in...");
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    logger.info("here: ", user);
    if (!user) throw new Error("User not found");
    const validPassword = await comparePasswords(password, user.passwordHash);
    if (!validPassword) {
      throw new Error();
    }

    const userData = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = await generateJwt(user);

    const resData = { user: userData, token };

    return res.status(200).send({ success: true, body: resData });
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, body: "Unauthorised" });
  }
};
