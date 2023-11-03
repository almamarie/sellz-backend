const User = require('../models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../logs/logger');
const Config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = new Config();

exports.generateHashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

comparePasswords = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

generateJwt = async (userId) => {
  const duration = 60 * 60 * config.jwt.duration;

  const payloadData = {
    sub: userId,
    iss: 'https://sellz-backend.com',
    aud: 'https://sellz.com',
    exp: Math.floor(Date.now() / 1000) + duration,
    iat: Math.floor(Date.now() / 1000),
    roles: ['user'],
  };

  return jwt.sign(payloadData, config.jwt.secret);
};

const createSendToken = async (user, statusCode, res) => {
  const token = await generateJwt(user.userId);

  const cookieOptions = {
    expires: new Date(Date.now() + config.jwtCookieExpiresIn * 60 * 60 * 1000),
    httpOnly: true,
  };

  if ((process.env.NODE_ENV = 'production')) cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  return res.status(statusCode).send({
    status: 'success',
    token,
    data: {
      user: user.format(),
    },
  });
};

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

  logger.info('User signed in successfully!');
  createSendToken(user, 201, res);
});

exports.requireAuth = catchAsync(async (req, res, next) => {
  logger.info('Require auth called');
  if (!req.headers || !req.headers.authorization)
    return new AppError('No authorization headers.', 401);

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length !== 2) return new AppError('Malformed token.', 401);

  const token = tokenBearer[1];
  const jwtResponse = jwt.verify(token, config.jwt.secret);

  const currentUser = await User.findOne({
    where: { userId: jwtResponse.sub },
  });

  console.log('Current User: ', currentUser);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  logger.info('User Verified');
  return next();
});
