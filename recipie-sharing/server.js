require("dotenv").config();

const http = require("http");
const app = require("./app");
const db = require("./models");

db.sequelize.sync();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

module.exports = server;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running locally on port ${PORT}`);
  });
}
