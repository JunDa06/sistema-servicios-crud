const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // railway
  process.env.DB_USER,       // root
  process.env.DB_PASSWORD,   // password
  {
    host: process.env.DB_HOST, // mysql.railway.internal
    port: process.env.DB_PORT, // 3306
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;