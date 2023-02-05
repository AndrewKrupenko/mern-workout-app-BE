const express = require("express");
const {
  getWorkouts,
  getWorkoutItem,
  createWorkoutItem,
  updateWorkoutItem,
  deleteWorkoutItem,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

router.get("/", getWorkouts);
router.get("/:id", getWorkoutItem);
router.post("/", createWorkoutItem);
router.patch("/:id", updateWorkoutItem);
router.delete("/:id", deleteWorkoutItem);

module.exports = router;
