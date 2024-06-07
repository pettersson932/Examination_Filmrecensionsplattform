const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST endpoint to add a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password, role } = req.body; // Destructure necessary fields from request body

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Create a new user instance using the data from the request body
    const newUser = new User({ username, email, password, role });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Respond with the saved user object
  } catch (err) {
    res.status(400).json({ message: err.message }); // If an error occurs, respond with the error message
  }
});

module.exports = router;
