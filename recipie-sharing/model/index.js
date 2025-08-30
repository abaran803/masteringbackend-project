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

//exporting the module
module.exports = db;
