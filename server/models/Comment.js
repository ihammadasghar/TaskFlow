const mongoose = require('mongoose')

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
  }
})

// Index by task for query and createdAt for sorting
commentSchema.index({task: 1, createdAt: -1})

module.exports = mongoose.model('Comment', commentSchema)