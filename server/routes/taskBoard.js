const express = require('express')
const router = express.Router()
const TaskBoard = require('../models/TaskBoard')

// get all taskboards
router.get('/list', async (req, res) => {
  try {
    const taskBoards = await TaskBoard.find()
    res.json(taskBoards)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// fetch taskboard tasks
router.post('/details', async (req, res) => {
    try {
        const taskBoardTasks = await TaskBoard.findOne({_id: req.body.taskBoardId}).populate("tasks")
        res.json(taskBoardTasks)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })

// create taskboard
router.post('/add', async (req, res) => {
  const taskBoard = new TaskBoard({
    name: req.body.name,
    stages: req.body.stages
  })
  try {
    const taskBoard = await taskBoard.save()
    const taskBoardList = await TaskBoard.find()
    res.status(201).json({taskBoardList, success: true, message: 'Added TaskBoard'})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
    console.log(req.body.name)
  }
})

// update taskboard
router.patch('/edit', getTaskBoard, async (req, res) => {
  try {
    let replacement = {
      name: req.body.name
    }
    await TaskBoard.updateOne({_id: req.body._id}, replacement, {new: true})
    const taskBoardList = await TaskBoard.find()
    res.json({taskBoardList, success: true, message: 'Updated TaskBoard'})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// delete taskboard
router.delete('/remove', async (req, res) => {
  try {
    await TaskBoard.deleteOne({_id: req.body._id})
    const taskBoardList = await TaskBoard.find()
    res.json({ taskBoardList,success: true, message: 'Deleted TaskBoard' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

async function getTaskBoard(req, res, next) {
  let taskBoard
  try {
    taskBoard = await TaskBoard.findById(req.body._id)
    if (taskBoard == null) {
      return res.status(404).json({ message: 'Cannot find taskBoard' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.taskBoard = taskBoard
  next()
}

module.exports = router