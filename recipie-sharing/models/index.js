const { Sequelize, DataTypes } = require("sequelize");
const sendNotification = require("../helper/sendNotification");

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
db.favouriteRecipe = require("../modules/user/model").favouriteRecipe(
  sequelize,
  DataTypes
);
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
db.comments = require("../modules/comment/model")(sequelize, DataTypes);
db.ratings = require("../modules/rating/model")(sequelize, DataTypes);
db.notifications = require("../modules/notification/model")(
  sequelize,
  DataTypes
);

db.users.hasMany(db.recipies, { as: "creater", foreignKey: "created_by" });
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
  otherKey: "category_id",
});

db.categories.belongsToMany(db.recipies, {
  through: db.recipeCategories,
  foreignKey: "category_id",
  otherKey: "recipe_id",
});

db.recipies.belongsToMany(db.users, {
  through: { model: db.comments, unique: false },
  as: "CommentedBy",
  foreignKey: "recipe_id",
  otherKey: "user_id",
});

db.users.belongsToMany(db.recipies, {
  through: { model: db.comments, unique: false },
  as: "CommentedRecipe",
  foreignKey: "user_id",
  otherKey: "recipe_id",
});

db.recipies.belongsToMany(db.users, {
  through: db.ratings,
  as: "RatedBy",
  foreignKey: "recipe_id",
  otherKey: "user_id",
});

db.users.belongsToMany(db.recipies, {
  through: db.ratings,
  as: "RatedRacipe",
  foreignKey: "user_id",
  otherKey: "recipe_id",
});

db.users.hasMany(db.notifications, { foreignKey: "user_id" });
db.notifications.belongsTo(db.users, { foreignKey: "user_id" });

db.users.belongsToMany(db.recipies, {
  through: db.favouriteRecipe,
  as: "FavouriteRecipes",
  foreignKey: "user_id",
  otherKey: "recipe_id",
});

db.recipies.belongsToMany(db.users, {
  through: db.favouriteRecipe,
  as: "FavouritedBy",
  foreignKey: "recipe_id",
  otherKey: "user_id",
});

db.comments.afterCreate(
  "commentHookAfterCreate",
  async (commentData, _options) => {
    const { recipe_id: recipeId, user_id: userId } = commentData.toJSON();
    sendNotification(recipeId, userId, db, "comment", "created");
  }
);

db.ratings.afterCreate(
  "ratingHookAfterCreate",
  async (ratingData, _options) => {
    const { recipe_id: recipeId, user_id: userId } = ratingData.toJSON();
    sendNotification(recipeId, userId, db, "rating", "created");
  }
);

db.ratings.afterUpdate(
  "ratingHookAfterUpdate",
  async (ratingData, _options) => {
    const { recipe_id: recipeId, user_id: userId } = ratingData.toJSON();
    sendNotification(recipeId, userId, db, "rating", "updated");
  }
);

db.recipies.afterUpdate(
  "recipeHookAfterUpdate",
  async (recipeData, _options) => {
    const { id: recipeId, created_by: userId } = recipeData.toJSON();
    sendNotification(recipeId, userId, db, "recipe", "updated");
  }
);

// db.follows.afterCreate(
//   "followHookAfterCreate",
//   async (followData, _options) => {
//     console.log(followData.toJSON());
//     const { follower_id: followerId, following_id: followingId } =
//       followData.toJSON();
//     sendNotification(followerId, followingId, db, "follower", "created");
//   }
// );

//exporting the module
module.exports = db;
