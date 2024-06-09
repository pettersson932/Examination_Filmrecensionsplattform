const express = require("express");
const router = express.Router();
const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  getReviewsByMovieId,
} = require("../controllers/movieController");
const { authUser } = require("../middlewares/auth");

router
  .post("/", authUser, addMovie)
  .get("/", getMovies)
  .get("/:id", getMovieById)
  .put("/:id", authUser, updateMovieById)
  .delete("/:id", authUser, deleteMovieById)
  .get("/:id/reviews", getReviewsByMovieId);

module.exports = router;
