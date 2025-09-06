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
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
require("./models/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const reqDir = path.join(__dirname, "logFiles");
const reqFile = path.join(reqDir, "requests.log");

if (!fs.existsSync(reqDir)) {
  fs.mkdirSync(reqDir, { recursive: true });
}

const reqStream = fs.createWriteStream(reqFile, {
  flags: "a",
});

app.use(morgan("combined", { stream: reqStream }));

app.get("/", (req, res) => {
  res.status(200).send({ message: "OK" });
});
app.use("/api/users", authRoutes);
app.use("/api/ingredients", verifyToken, ingredientRoutes);
app.use("/api/recipes", verifyToken, recipeRoutes);
app.use("/api/tags", verifyToken, tagRoutes);
app.use("/api/categories", verifyToken, categoryRoutes);
app.use("/api/comments", verifyToken, commentRoutes);
app.use("/api/ratings", verifyToken, ratingRoutes);
app.use("/api/notifications", verifyToken, notificationRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(error);

module.exports = app;
