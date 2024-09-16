const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Get tasks for a specific project
router.get('/:projectId', (req, res) => {
    Task.find({ project_id: req.params.projectId }, (err, tasks) => {
        if (err) return res.status(500).send(err);
        res.json(tasks);
    });
});

// Create a new task
router.post('/:projectId', (req, res) => {
    const newTask = new Task({
        ...req.body,
        project_id: req.params.projectId
    });
    newTask.save((err, task) => {
        if (err) return res.status(500).send(err);
        res.json(task);
    });
});

module.exports = router;
