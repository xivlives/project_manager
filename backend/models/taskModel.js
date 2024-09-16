const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending' },
    due_date: { type: Date, required: true },
    project_id: { type: String, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);
