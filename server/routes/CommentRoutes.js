const express = require('express')
const router = express.Router()
const { saveComment, removeComment, updateComment } = require('../controllers/CommentController')
const { getTaskDetails } = require('../controllers/TaskController')

router.post('/add', async (req, res) => {
  const comment = {
    message: req.body.message,
    taskId: req.body.taskId
  }
  try {
    await saveComment(comment)

    const updatedTask = await getTaskDetails(req.body.taskId)
    res.status(201).json({ data: updatedTask, success: true, message: 'Added Comment' })
    console.log("Added Comment")
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.patch('/edit', async (req, res) => {
  try {
    let replacement = {
      _id: req.body._id,
      message: req.body.message,
      updatedAt: Date.now()
    }
    await updateComment(replacement)

    const updatedTask = await getTaskDetails(req.body.taskId)
    res.json({ data: updatedTask, success: true, message: 'Updated Comment' })
    console.log("Updated Comment")
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.delete('/remove', async (req, res) => {
  try {
    await removeComment(req.body._id)

    const updatedTask = await getTaskDetails(req.body.taskId)
    res.json({ data: updatedTask, success: true, message: 'Deleted Comment' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router