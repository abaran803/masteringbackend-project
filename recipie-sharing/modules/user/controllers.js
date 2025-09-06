const db = require("../../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const User = db.users;
const Follow = db.follows;

const signup = async (req, res, next) => {
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.send({ message: "User registered successfully!" });
  } catch (err) {
    next(err);
  }
};

const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const follow = async (req, res, next) => {
  try {
    const { id: followingId } = req.params;
    if (followingId === req.user_id) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }
    const userToFollow = await User.findByPk(followingId);
    if (!userToFollow) {
      return res.status(404).send({
        message: "User to follow not found",
      });
    }
    await Follow.create({
      follower_id: req.user_id,
      following_id: userToFollow.id,
    });
    res.status(200).send({
      message: "Followed User",
    });
  } catch (err) {
    next(err);
  }
};

const followers = async (req, res, next) => {
  try {
    const { user_id: id } = req;
    const { followers } = await db.users.findByPk(id, {
      include: [
        {
          model: db.users,
          as: "followers",
          attributes: ["id", "username", "email"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).send({
      message: "Followers list fetched successfully",
      data: followers,
    });
  } catch (err) {
    next(err);
  }
};

const followings = async (req, res, next) => {
  try {
    const { user_id: id } = req;
    const { followings } = await db.users.findByPk(id, {
      include: [
        {
          model: db.users,
          as: "followings",
          attributes: ["id", "username", "email"],
          through: { attributes: [] },
        },
      ],
      attributes: ["id"],
    });
    res.status(200).send({
      message: "Followings list fetched successfully",
      data: followings,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  follow,
  followers,
  followings,
};
