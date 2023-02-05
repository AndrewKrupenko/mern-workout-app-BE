const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getWorkoutItem = async (req, res) => {
  const { id } = req.params;

  // check if id is invalid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const createWorkoutItem = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  !title && emptyFields.push("title");
  !load && emptyFields.push("load");
  !reps && emptyFields.push("reps");

  if (!!emptyFields.length) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    // add doc to db
    const workout = await Workout.create({
      title,
      load,
      reps,
      user_id,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteWorkoutItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const updateWorkoutItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getWorkoutItem,
  createWorkoutItem,
  updateWorkoutItem,
  deleteWorkoutItem,
};
