const User = require('../models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../logs/logger');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.signIn = catchAsync(async (req, res, next) => {
  logger.info('Signing user in...');
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !(await comparePasswords(password, user.passwordHash))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const userData = {
    userId: user.userId,
    name: `${user.firstName} ${user.lastName}`,
  };

  const token = await generateJwt(userData);
  logger.info('User signed in successfully!');
  return res.status(200).send({
    status: 'success',
    token,
    data: {
      user: user.format(),
    },
  });
});

exports.requireAuth = catchAsync(async (req, res, next) => {
  logger.info('Require auth called');
  if (!req.headers || !req.headers.authorization)
    // return res.status(401).send({ message: 'No authorization headers.' });
    return new AppError('No authorization headers.', 401);

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length !== 2)
    // return res.status(401).send({ message: 'Malformed token.' });
    return new AppError('Malformed token.', 401);

  const token = tokenBearer[1];
  const jwtResponse = jwt.verify(token, config.jwt.secret);
  logger.info(jwtResponse);
  logger.info('User Verified');
  return next();
});

const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

exports.generateHashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.comparePasswords = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

exports.generateJwt = async (user) => {
  const duration = 60 * 60 * config.jwt.duration;

  const payloadData = {
    sub: user.userId,
    iss: 'https://sellz-backend.com',
    aud: 'https://sellz.com',
    exp: Math.floor(Date.now() / 1000) + duration,
    iat: Math.floor(Date.now() / 1000),
    name: user.name,
    roles: ['user'],
  };

  console.log('\n\n\nPayload data: ', payloadData);

  return jwt.sign(payloadData, config.jwt.secret);
};
