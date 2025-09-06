const express = require("express");
const router = express.Router();
const { verifySignUp } = require("./middleware");
const {
  signup,
  signin,
  follow,
  followers,
  followings,
} = require("./controllers");
const verifyToken = require("../../middleware/auth");
const {
  validateSignup,
  validateSignin,
  validateFollow,
} = require("./validation");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", validateSignup, verifySignUp, signup);
router.post("/signin", validateSignin, signin);

router.post("/follow/:id", validateFollow, verifyToken, follow);
router.get("/followers", verifyToken, followers);
router.get("/followings", verifyToken, followings);

module.exports = router;
