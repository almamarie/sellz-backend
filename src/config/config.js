const config = {
  dev: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    host: process.env.SQL_HOST,
    dialect: process.env.DIALECT,
    port: process.env.SQL_PORT,
  },

  jwt: {
    secret:
      "aivhuvgwuVEWuvbew9uviwepvp879wef8fqfbqf8qp78fqwfihqfpiuqfgeaucasvuiasvavhioavg89arvhiosbvsjvasyv",
    duration: process.env.JWT_DURATION,
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres",
  },
};

module.exports = config;
