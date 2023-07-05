const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const TaskBoard = require('../models/TaskBoard')

// get task
router.get('/details', async (req, res) => {
  try {
      const taskDetails = await Task.findOne({_id: req.body._id}).populate("comments")
      res.json(taskDetails)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

router.post('/add', async (req, res) => {
  const task = new Task({
    header: req.body.header,
    stage: req.body.stage
  })
  try {
    const updatedTaskBoard = await task.save().then(t => (
      TaskBoard.findByIdAndUpdate(req.body.taskBoardId,{ '$push': { 'tasks': t._id } }, {new: true})
  ))
    res.status(201).json({updatedTaskBoard, success: true, message: 'Added Task'})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.patch('/edit', async (req, res) => {
  try {
    let replacement = {
      header: req.body.header,
      stage: req.body.stage, 
      updatedAt: Date.now()
    }
    await Task.updateOne({_id: req.body._id}, replacement)
    const updatedTaskboard = await TaskBoard.findById(req.body.taskBoardId)
    res.json({updatedTaskboard, success: true, message: 'Updated Task'})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.delete('/remove', async (req, res) => {
  try {
    await Task.deleteOne({_id: req.body._id})
    const updatedTaskBoard = await TaskBoard.findByIdAndUpdate(req.body.taskBoardId,{ '$pull': { 'tasks': req.body._id } })
    res.json({ updatedTaskBoard, success: true, message: 'Deleted Task' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router