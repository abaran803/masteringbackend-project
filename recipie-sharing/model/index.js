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
db.users = require("../modules/auth/model")(sequelize, DataTypes);
db.ingredients = require("../modules/ingredient/model")(sequelize, DataTypes);
db.recipies = require("../modules/recipe/model").recipe(sequelize, DataTypes);
db.recipeIngredients = require("../modules/recipe/model").recipeIngredient(
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

//exporting the module
module.exports = db;
