const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

// Get all projects
router.get('/', (req, res) => {
    Project.getAllProjects((err, projects) => {
        if (err) return res.status(500).send(err);
        res.json(projects);
    });
});

// Create a new project
router.post('/', (req, res) => {
    const newProject = req.body;
    Project.createProject(newProject, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Project created successfully', result });
    });
});

module.exports = router;
