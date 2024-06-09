const Review = require("../models/reviewModel");
const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.createReview = async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: "Invalid movieId format" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const movieExists = await Movie.findById(movieId);
    const userExists = await User.findById(userId);

    if (!movieExists) {
      return res.status(404).json({ error: "Movie not found" });
    }

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const newReview = new Review({
      movieId,
      userId,
      rating,
      comment,
    });

    await newReview.save();

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (reviews.length === 0) {
      res.json({ message: "No reviews found" });
    } else {
      res.json(reviews);
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID format" });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId, userId, rating, comment } = req.body;
    const options = { new: true };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Review ID format" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { movieId, userId, rating, comment },
      options
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID format" });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
