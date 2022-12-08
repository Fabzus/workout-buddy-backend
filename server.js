require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const cors = require("cors");

const port = process.env.PORT;

// express app
const app = express();

//cors
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// this is basically a logger

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests only if promise is fulfilled
    app.listen(port, () => {
      console.log(`DB connection succesful & listening on port ${port}!!!`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

process.env;
