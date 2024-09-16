const pool = require('../config/mysqlConnection');
const Task = require('../models/taskModel'); // Task model for MongoDB

const Project = {};

// Get all projects with their tasks from MongoDB
Project.getAllProjects = async () => {
  try {
    // Fetch projects from MySQL
    const [projects] = await pool.query('SELECT * FROM projects');
    
    // For each project, fetch associated tasks from MongoDB
    const projectsWithTasks = await Promise.all(
      projects.map(async (project) => {
        // Find tasks for each project using the project id
        const tasks = await Task.find({ project_id: project.id });
        return {
          ...project,    // Include project data
          tasks: tasks   // Add associated tasks
        };
      })
    );
    
    return projectsWithTasks;
  } catch (error) {
    throw error;
  }
};

// Create a new project (you can still create the tasks separately via task routes)
Project.createProject = async (newProject) => {
  const { title, description } = newProject;
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (title, description) VALUES (?, ?)',
      [title, description]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = Project;
