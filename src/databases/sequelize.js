const Sequelize = require("sequelize");
const config = require("../config/config");

const c = config.dev;

const sequelize = new Sequelize(
  process.env.SQL_DATABASE,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  { host: process.env.SQL_HOST, dialect: "mysql" }
);

module.exports = sequelize;
