const Movie = require("../models/movieModel");
const Review = require("../models/reviewModel");

exports.addMovie = async (req, res) => {
  try {
    const { title, director, releaseYear, genre } = req.body;

    // Check if all required fields are present
    if (!title || !director || !releaseYear || !genre) {
      return res.status(400).json({
        message:
          "Please provide all required fields: title, director, releaseYear, genre",
      });
    }

    // Create a new movie instance
    const movie = new Movie({
      title,
      director,
      releaseYear,
      genre,
    });

    // Save the movie to the database
    await movie.save();

    // Respond with the created movie
    res.status(201).json(movie);
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};

// Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}, "title director releaseYear genre");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a movie by ID
exports.updateMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a movie by ID
exports.deleteMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews by movie ID
exports.getReviewsByMovieId = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
