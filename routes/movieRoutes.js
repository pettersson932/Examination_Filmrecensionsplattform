const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { authenticate } = require("../middlewares/auth");

router
  .post("/", authenticate, movieController.addMovie)
  .get("/", movieController.getMovies)
  .get("/:id", movieController.getMovieById)
  .put("/:id", authenticate, movieController.updateMovieById)
  .delete("/:id", authenticate, movieController.deleteMovieById)
  .get("/:id/reviews", movieController.getReviewsByMovieId);

module.exports = router;
