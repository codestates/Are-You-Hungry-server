require("dotenv").config();

module.exports = {
  development2: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
  },
  development: {
    username: process.env.DATABASE_HOST,
    password: process.env.DATABASE_HOST,
    database: process.env.DATABASE_HOST,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },

  test: {
    username: process.env.DATABASE_HOST,
    password: process.env.DATABASE_HOST,
    database: process.env.DATABASE_HOST,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_HOST,
    password: process.env.DATABASE_HOST,
    database: process.env.DATABASE_HOST,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  },
};
