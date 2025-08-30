const jwt = require("jsonwebtoken");
const db = require("../../model/index.js");
const User = db.users;

verifySignUp = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    next();
  } catch (err) {
    console.log(err, "ERROR IS HERE");
  }
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken, verifySignUp };
