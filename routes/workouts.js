const express = require("express");
const {
  getWorkouts,
  getWorkoutItem,
  createWorkoutItem,
  updateWorkoutItem,
  deleteWorkoutItem,
} = require("../controllers/workoutController");

const router = express.Router();

router.get("/", getWorkouts);
router.get("/:id", getWorkoutItem);
router.post("/", createWorkoutItem);
router.patch("/:id", updateWorkoutItem);
router.delete("/:id", deleteWorkoutItem);

module.exports = router;
