const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Get tasks for a specific project
router.get('/:projectId', async (req, res) => {
    try {
        const tasks = await Task.find({ project_id: req.params.projectId });
        res.json(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving tasks', error: error.message });
    }
});

// Create a new task for a specific project
router.post('/:projectId', async (req, res) => {
    try {
        const newTask = new Task({
            ...req.body,
            project_id: req.params.projectId
        });
        
        const savedTask = await newTask.save();
        res.json({ message: 'Task created successfully', task: savedTask });
    } catch (error) {
        res.status(500).send({ message: 'Error creating task', error: error.message });
    }
});

module.exports = router;
