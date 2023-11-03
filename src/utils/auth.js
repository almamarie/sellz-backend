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
