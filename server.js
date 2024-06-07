const express = require("express");
const mongoose = require("mongoose");

const userController = require("./controllers/userController");
const Movie = require("./models/Movie"); //vet ej varför denna hämtas in
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB_URI, {}) //var hämtas dessa värden?
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/users", userController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
