const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const Project = require('../models/ProjectModel');

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
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }
        const newTask = new Task({
            ...req.body,
            project_id: req.params.projectId,
            project_name: project.title
        });
        
        const savedTask = await newTask.save();
        res.json({ message: 'Task created successfully', task: savedTask });
    } catch (error) {
        res.status(500).send({ message: 'Error creating task', error: error.message });
    }
});

// Update a task
router.put('/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).send({ message: 'Error updating task', error: error.message });
    }
});

module.exports = router;
