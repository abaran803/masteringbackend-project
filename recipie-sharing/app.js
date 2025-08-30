const cors = require("cors");
const express = require("express");
const authRoutes = require("./modules/auth/routes");
require("./model/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRoutes);

module.exports = app;
