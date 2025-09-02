const express = require("express");
const {
  createRating,
  getAllRating,
  getRatingById,
  updateRating,
  deleteRating,
} = require("./controllers");
const router = express.Router();

router.post("/", createRating);
router.get("/", getAllRating);
router.get("/:id", getRatingById);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

module.exports = router;
