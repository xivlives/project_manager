const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoute');
const taskRoutes = require('./routes/taskRoutes');
const authRoute = require('./routes/authRoute'); 
require('dotenv').config();

const app = express();
app.use(express.json());

//configure cors
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
} 
app.use(cors(corsOptions));

// MongoDB connection (for tasks)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// MySQL connection (for projects)
const mysqlConnection = require('./config/mysqlConnection');


// Routes
app.use('/api/auth', authRoute);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
