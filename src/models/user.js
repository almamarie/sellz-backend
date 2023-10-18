const { INTEGER, STRING, DATE, NOW } = require("sequelize");
// const { define } = require("../databases/sequelize");
const sequelize = require("../databases/sequelize");

const User = sequelize.define("user", {
  userId: {
    type: INTEGER,
    autoIncrement: true,
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

  email: {
    type: STRING,
    allowNull: false,
    unique: true,
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
    email: this.email,
  };
};

module.exports = User;
