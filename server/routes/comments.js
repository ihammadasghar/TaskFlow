const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const Task = require('../models/Task')
const { saveComment, removeComment } = require('../controllers/CommentController')

router.post('/add', async (req, res) => {
  const comment = new Comment({
    message: req.body.message,
    taskId: req.body.taskId
  })
  try {
    await saveComment(comment)

    const updatedTask = await Task.findById(req.body.taskId).populate("comments")
    res.status(201).json({ data: updatedTask, success: true, message: 'Added Comment' })
    console.log("Added Comment")
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.patch('/edit', async (req, res) => {
  try {
    let replacement = {
      message: req.body.message,
      updatedAt: Date.now()
    }
    await Comment.updateOne({ _id: req.body._id }, replacement)

    const updatedTask = await Task.findById(req.body.taskId).populate("comments")
    res.json({ data: updatedTask, success: true, message: 'Updated Comment' })
    console.log("Updated Comment")
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.delete('/remove', async (req, res) => {
  try {
    await removeComment(req.body._id)

    const updatedTask = await Task.findById(req.body.taskId).populate("comments")
    res.json({ data: updatedTask, success: true, message: 'Deleted Comment' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router