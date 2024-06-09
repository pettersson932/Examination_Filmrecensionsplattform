const Movie = require("../models/movieModel");
const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

exports.addMovie = async (req, res) => {
  try {
    const { title, director, releaseYear, genre } = req.body;

    if (!title || !director || !releaseYear || !genre) {
      return res.status(400).json({
        message:
          "Please provide all required fields: title, director, releaseYear, genre",
      });
    }

    const currentYear = new Date().getFullYear();
    if (releaseYear < 1888 || releaseYear > currentYear) {
      return res.status(400).json({
        message: `Please provide a valid release year between 1888 and ${currentYear}`,
      });
    }

    const movie = new Movie({
      title,
      director,
      releaseYear,
      genre,
    });

    await movie.save();

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid movie ID format" });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.updateMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid movie ID format" });
    }

    const movie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.deleteMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid movie ID format" });
    }

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.getReviewsByMovieId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid movie ID format" });
    }

    const reviews = await Review.find({ movieId: id });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this movie" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};
