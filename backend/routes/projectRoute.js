const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

// Get all projects with their tasks
router.get('/', async (req, res) => {
  try {
    const projects = await Project.getAllProjects(); // Fetch projects with tasks
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new project (does not include tasks)
router.post('/', async (req, res) => {
  const newProject = req.body;
  try {
    const result = await Project.createProject(newProject);
    res.json({ message: 'Project created successfully', result });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
