const mongoose = require('mongoose')

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
  taskBoard: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "TaskBoard"
  },
  taskStage: {
    type: Number,
    required: true
  }
})

// Index by taskboard for querying and taskstage for sorting
taskSchema.index({taskBoard: 1, taskStage: 1})

module.exports = mongoose.model('Task', taskSchema)