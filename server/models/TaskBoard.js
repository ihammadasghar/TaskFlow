const mongoose = require('mongoose')

const taskBoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stages: [String],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  tasks: [{
    type: mongoose.Types.ObjectId,
    ref: "Task"
  }]
})

module.exports = mongoose.model('TaskBoard', taskBoardSchema)