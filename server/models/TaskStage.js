const mongoose = require('mongoose')

const taskStageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  tasks: [{
    type: mongoose.Types.ObjectId,
    ref: "Task"
  }],
  taskBoardId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "TaskBoard"
  }
})

const TaskStageModel = mongoose.model('TaskStage', taskStageSchema)
module.exports = TaskStageModel