const cors = require("cors");
const express = require("express");
const authRoutes = require("./modules/auth/routes");
const ingredientRoutes = require("./modules/ingredient/routes");
require("./model/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/ingredients", ingredientRoutes);

module.exports = app;
