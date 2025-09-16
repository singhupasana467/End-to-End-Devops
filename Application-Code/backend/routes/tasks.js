const Task = require("../models/task");
const express = require("express");
const router = express.Router();

// Create
router.post("/", async (req, res) => {
    try {
        const task = new Task({ task: req.body.title });
        console.log("Incoming body:", req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;