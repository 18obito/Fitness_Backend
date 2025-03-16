const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Workout = require('../models/Workout');

const router = express.Router();

// Add a Workout
router.post('/add', authMiddleware, async (req, res) => {
    const { exercise, duration, caloriesBurned } = req.body;

    try {
        const newWorkout = new Workout({
            user: req.user,
            exercise,
            duration,
            caloriesBurned
        });

        await newWorkout.save();
        res.json(newWorkout);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get User Workouts
router.get('/', authMiddleware, async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user }).sort({ date: -1 });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Delete a Workout
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.json({ message: "Workout Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
