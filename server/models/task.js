const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: false
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }],
  stageId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "TaskStage"
  }
})

const TaskModel = mongoose.model('Task', taskSchema)
module.exports = TaskModel