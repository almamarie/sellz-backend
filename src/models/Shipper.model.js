const { INTEGER, STRING } = require("sequelize");
const sequelize = require("../databases/sequelize");

const Shipper = sequelize.define("shipper", {
  shipperId: {
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Shipper;
