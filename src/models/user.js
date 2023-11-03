const crypto = require('crypto');
const { INTEGER, STRING, DATE, NOW, DATEONLY } = require('sequelize');
const sequelize = require('../databases/sequelize');

const User = sequelize.define('user', {
  userId: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  firstName: {
    type: STRING,
    allowNull: false,
  },

  lastName: {
    type: STRING,
    allowNull: false,
  },

  otherNames: {
    type: STRING,
    allowNull: true,
  },

  birthdate: {
    type: DATEONLY,
    allowNull: false,
  },

  gender: {
    type: STRING,
    allowNull: false,
    unique: false,
    validate: {
      isIn: {
        args: [['M', 'F']],
        msg: 'Gender must be M or F',
      },
    },
  },

  country: {
    type: STRING,
    allowNull: false,
    unique: false,
  },

  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },

  address: {
    type: STRING,
    allowNull: false,
  },

  profilePicture: {
    type: STRING,
    allowNull: false,
  },

  passwordHash: {
    type: STRING,
    allowNull: false,
  },
});

User.prototype.format = function () {
  return {
    userId: this.userId,
    firstName: this.firstName,
    lastName: this.lastName,
    otherNames: this.otherNames,
    birthdate: this.birthdate,
    gender: this.gender,
    country: this.country,
    email: this.email,
    address: this.address,
    profilePicture: this.profilePicture,
  };
};

User.prototype.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = User;
