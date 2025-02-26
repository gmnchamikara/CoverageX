// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "taskapp",
//   "root",
//   "root",
//   {
//     host: "localhost", // database host
//     dialect: "mysql",
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "taskapp", // Database name
  "root", // Database user
  "root", // Database password
  {
    host: "db", // ✅ Use the service name from docker-compose.yml
    port: 3306, // ✅ MySQL listens on port 3306 inside the container
    dialect: "mysql",
    logging: false, // Optional: disable logging for cleaner output
  }
);

module.exports = sequelize;
