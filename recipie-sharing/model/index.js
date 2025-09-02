const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to testing `);
  })
  .catch((err) => {
    console.log(err);
  });

//creating a global variable and assigning an empty variable to be used later
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to models which are the users and the tokens schema
db.users = require("../modules/user/model").user(sequelize, DataTypes);
db.follows = require("../modules/user/model").follow(sequelize, DataTypes);
db.ingredients = require("../modules/ingredient/model")(sequelize, DataTypes);
db.recipies = require("../modules/recipe/model").recipe(sequelize, DataTypes);
db.recipeIngredients = require("../modules/recipe/model").recipeIngredient(
  sequelize,
  DataTypes
);
db.tags = require("../modules/tag/model").tag(sequelize, DataTypes);
db.recipeTags = require("../modules/tag/model").recipeTag(sequelize, DataTypes);

db.categories = require("../modules/category/model").category(
  sequelize,
  DataTypes
);
db.recipeCategories = require("../modules/category/model").recipeCategory(
  sequelize,
  DataTypes
);

db.users.hasMany(db.recipies, { as: "created_by", foreignKey: "created_by" });
db.recipies.belongsTo(db.users, { foreignKey: "created_by", as: "creater" });

db.recipies.belongsToMany(db.ingredients, {
  through: db.recipeIngredients,
  foreignKey: "recipe_id",
  otherKey: "ingredient_id",
});

db.ingredients.belongsToMany(db.recipies, {
  through: db.recipeIngredients,
  foreignKey: "ingredient_id",
  otherKey: "recipe_id",
});

db.users.belongsToMany(db.users, {
  through: db.follows,
  as: "followers",
  foreignKey: "following_id",
  otherKey: "follower_id",
});

db.users.belongsToMany(db.users, {
  through: db.follows,
  as: "followings",
  foreignKey: "follower_id",
  otherKey: "following_id",
});

db.recipies.belongsToMany(db.tags, {
  through: db.recipeTags,
  foreignKey: "recipe_id",
  otherKey: "tag_id",
});

db.tags.belongsToMany(db.recipies, {
  through: db.recipeTags,
  foreignKey: "tag_id",
  otherKey: "recipe_id",
});

db.recipies.belongsToMany(db.categories, {
  through: db.recipeCategories,
  foreignKey: "recipe_id",
  otherKey: "categoty_id",
});

db.categories.belongsToMany(db.recipies, {
  through: db.recipeCategories,
  foreignKey: "categoty_id",
  otherKey: "recipe_id",
});

//exporting the module
module.exports = db;
