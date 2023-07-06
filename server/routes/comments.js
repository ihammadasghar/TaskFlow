const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const Task = require('../models/Task')

router.post('/add', async (req, res) => {
  const comment = new Comment({
    message: req.body.message
  })
  try {
    const updatedTask = await comment.save().then(c => (
      Task.findByIdAndUpdate(req.body.taskId,{ '$push': { 'comments': c._id } }, {new: true})
  ))
    res.status(201).json({data: updatedTask, success: true, message: 'Added Comment'})
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
    await Comment.updateOne({_id: req.body._id}, replacement, {new: true})
    const updatedTask = await Task.findById(req.body.taskId)
    res.json({data: updatedTask, success: true, message: 'Updated Comment'})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.delete('/remove', async (req, res) => {
  try {
    await Comment.deleteOne({_id: req.body._id})
    const updatedTask = await Task.findByIdAndUpdate(req.body.taskId,{ '$pull': { 'comments': req.body._id } })
    res.json({ data: updatedTask, success: true, message: 'Deleted Comment' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router