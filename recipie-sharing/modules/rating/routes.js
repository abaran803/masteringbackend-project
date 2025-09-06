const express = require("express");
const {
  createRating,
  getAllRating,
  getRatingById,
  updateRating,
  deleteRating,
} = require("./controllers");
const {
  validateRatingId,
  validateUpdateRating,
  validateCreateRating,
} = require("./validation");
const router = express.Router();

router.post("/", validateCreateRating, createRating);
router.get("/", getAllRating);
router.get("/:id", validateRatingId, getRatingById);
router.put("/:id", validateUpdateRating, updateRating);
router.delete("/:id", validateRatingId, deleteRating);

module.exports = router;
