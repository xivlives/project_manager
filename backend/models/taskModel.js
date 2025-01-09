const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,   // Store the corresponding MongoDB project id
    required: true
  },
  project_name: {
    type: String,   // Store the corresponding project name
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
