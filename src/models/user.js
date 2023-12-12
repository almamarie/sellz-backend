const crypto = require('crypto');
const { STRING, DATE, DATEONLY, UUID, NOW } = require('sequelize');
const sequelize = require('../databases/sequelize');
const { generateId } = require('../utils/generateId');
const { roles } = require('../utils/roles-permissions');
const User = sequelize.define('user', {
  userId: {
    type: UUID,
    allowNull: false,
    primaryKey: true,
    unique: true,
    defaultValue: () => generateId(),
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

  role: {
    type: STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [[...roles]],
        msg: 'Invalid user type',
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

  passwordResetToken: {
    type: STRING,
    allowNull: true,
  },

  passwordResetExpires: {
    type: DATE,
    allowNull: true,
  },

  passwordChangedAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
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
    role: this.role,
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

User.prototype.changedPasswordAfter = function (JWTTimestamp) {
  if (this.updatedAt && this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
};

module.exports = User;
