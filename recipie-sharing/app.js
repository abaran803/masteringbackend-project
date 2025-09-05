const cors = require("cors");
const express = require("express");
const authRoutes = require("./modules/user/routes");
const ingredientRoutes = require("./modules/ingredient/routes");
const recipeRoutes = require("./modules/recipe/routes");
const tagRoutes = require("./modules/tag/routes");
const categoryRoutes = require("./modules/category/routes");
const commentRoutes = require("./modules/comment/routes");
const ratingRoutes = require("./modules/rating/routes");
const notificationRoutes = require("./modules/notification/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const error = require("./middleware/error");
const verifyToken = require("./middleware/auth");
require("./models/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", authRoutes);
app.use("/api/ingredients", verifyToken, ingredientRoutes);
app.use("/api/recipies", verifyToken, recipeRoutes);
app.use("/api/tags", verifyToken, tagRoutes);
app.use("/api/categories", verifyToken, categoryRoutes);
app.use("/api/comments", verifyToken, commentRoutes);
app.use("/api/ratings", verifyToken, ratingRoutes);
app.use("/api/notifications", verifyToken, notificationRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(error);

module.exports = app;
