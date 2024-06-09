const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB_URI, {})
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
