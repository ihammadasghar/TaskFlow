const mongoose = require('mongoose')

const taskBoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stages: [{
    type: mongoose.Types.ObjectId,
    ref: "TaskStage"
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const TaskBoardModel = mongoose.model('TaskBoard', taskBoardSchema)
module.exports = TaskBoardModel