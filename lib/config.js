require("dotenv").config();

console.log(process.env.DB_NAME);

module.exports = {
  env: process.env.env,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};
