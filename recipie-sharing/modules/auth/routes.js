const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { verifySignUp } = require("./middleware");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", verifySignUp, controller.signup);

router.post("/signin", controller.signin);

module.exports = router;
