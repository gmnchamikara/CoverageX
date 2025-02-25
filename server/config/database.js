const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "taskapp",
  "root",
  "root",
  {
    host: "localhost", // database host
    dialect: "mysql",
  }
);

module.exports = sequelize;
