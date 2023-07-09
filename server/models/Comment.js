const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
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
  taskId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Task'
  }
})

const CommentModel = mongoose.model('Comment', commentSchema)
module.exports = CommentModel