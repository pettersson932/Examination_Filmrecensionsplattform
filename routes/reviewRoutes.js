const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { authUser } = require("../middlewares/auth");

router.post("/", authUser, createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", authUser, updateReview);
router.delete("/:id", authUser, deleteReview);

module.exports = router;
