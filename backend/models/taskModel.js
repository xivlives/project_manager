const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  project_id: {
    type: Number,   // Store the corresponding MySQL project id
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
