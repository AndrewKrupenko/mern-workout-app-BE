require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

// middlewares for every request
app.use(express.json()); // allows to access data from the workoutController 'req' objects

app.use((req, res, next) => {
  console.log({ path: req.path, method: req.method });
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    // requests listening should be only when we connected to the DB, that's why this part should be inside mongoose section
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log({ error });
  });
