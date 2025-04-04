const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const hospitalRoutes = require("./routes/hospitalRoutes");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/hospitals", hospitalRoutes);
app.use(errorHandler);

module.exports = app;
