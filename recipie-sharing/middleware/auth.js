const jwt = require("jsonwebtoken");
const db = require("../model");

const verifyToken = async (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res.status(401).send({
      message: "Authorization token not found",
    });
  }
  const token = bearerToken.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({
        message: "User Unauthorized",
      });
    }
    const user = await db.users.findByPk(decoded.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.user_id = decoded.id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
