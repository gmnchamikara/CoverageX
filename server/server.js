const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database"); // Import Sequelize DB config
const postRoutes = require("./routes/tasks"); // Import routes

const app = express();
const PORT = 8181;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/tasks", postRoutes);

// Sync Sequelize with MySQL Database
sequelize
  .sync()
  .then(() => console.log("### - MySQL Database Connected & Synced Successfully!"))
  .catch((error) => console.log("!!! - Database Connection Error:", error));

app.listen(PORT, () => {
  console.log(`### - App is running on port ${PORT}`);
});
