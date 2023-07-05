const express = require('express')
const router = express.Router()
const TaskBoard = require('../models/TaskBoard')
const Tasks = require('../models/TaskBoard')

// get all taskboards
router.get('/', async (req, res) => {
  try {
    const taskBoards = await TaskBoard.find()
    res.json(taskBoards)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// get taskboard
router.get('/:id', getTaskBoard, (req, res) => {
  res.json(res.taskBoard)
})

// get taskboard tasks
router.get('/:id/tasks', async (req, res) => {
    try {
        const taskBoardTasks = await Tasks.find({taskBoard: req.params.id}).sort({taskStage: 1})
        res.json(taskBoardTasks)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })

// create taskboard
router.post('/', async (req, res) => {
  const taskBoard = new TaskBoard({
    name: req.body.name,
    stages: req.body.stages
  })
  try {
    const newTaskBoard = await taskBoard.save()
    res.status(201).json(newTaskBoard)
  } catch (err) {
    res.status(400).json({ message: err.message })
    console.log(req.body.name)
  }
})

// update taskboard
router.patch('/:id', getTaskBoard, async (req, res) => {
  if (req.body.name != null) {
    res.taskBoard.name = req.body.name
  }
  if (req.body.stages != null) {
    res.taskBoard.stages = req.body.stages
  }
  try {
    const updatedTaskBoard = await res.taskBoard.save()
    res.json(updatedTaskBoard)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete taskboard
router.delete('/:id', async (req, res) => {
  try {
    await TaskBoard.deleteOne({_id: req.params.id})
    res.json({ message: 'Deleted TaskBoard' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTaskBoard(req, res, next) {
  let taskBoard
  try {
    taskBoard = await TaskBoard.findById(req.params.id)
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