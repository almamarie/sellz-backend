// const config = {
//   dev: {
//     username: process.env.SQL_USERNAME,
//     password: process.env.SQL_PASSWORD,
//     database: process.env.SQL_DATABASE,
//     host: process.env.SQL_HOST,
//     dialect: process.env.DIALECT,
//     port: process.env.SQL_PORT,
//   },

//   jwt: {
//     secret:
//       'aivhuvgwuVEWuvbew9uviwepvp879wef8fqfbqf8qp78fqwfihqfpiuqfgeaucasvuiasvavhioavg89arvhiosbvsjvasyv',
//     duration: process.env.JWT_DURATION,
//   },
//   prod: {
//     username: '',
//     password: '',
//     database: 'udagram_prod',
//     host: '',
//     dialect: 'postgres',
//   },
// };

class Config {
  constructor() {
    this.username = process.env.SQL_USERNAME;
    this.password = process.env.SQL_PASSWORD;
    this.database = process.env.SQL_DATABASE;
    this.host = process.env.SQL_HOST;
    this.dialect = process.env.DIALECT;
    this.port = process.env.SQL_PORT;
    this.jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN;
    this.jwt = {
      secret:
        'aivhuvgwuVEWuvbew9uviwepvp879wef8fqfbqf8qp78fqwfihqfpiuqfgeaucasvuiasvavhioavg89arvhiosbvsjvasyv',
      duration: process.env.JWT_DURATION,
    };

    this.mailServer = {
      emailHost: process.env.EMAIL_HOST,
      emailPort: process.env.EMAIL_PORT,
      emailUsername: process.env.EMAIL_USERNAME,
      emailPassword: process.env.EMAIL_PASSWORD,
    };
  }
}

module.exports = Config;
