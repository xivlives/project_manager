const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql');
const projectRoutes = require('./routes/projectRoute');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB connection (for tasks)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// MySQL connection (for projects)
const mysqlConnection = require('./config/mysqlConnection');


// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
