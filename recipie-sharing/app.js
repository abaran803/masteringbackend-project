const cors = require("cors");
const express = require("express");
const authRoutes = require("./modules/auth/routes");
const ingredientRoutes = require("./modules/ingredient/routes");
const recipeRoutes = require("./modules/recipe/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const error = require("./middleware/error");
require("./model/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(error);

module.exports = app;
