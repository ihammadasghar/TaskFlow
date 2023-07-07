const express = require('express')
const router = express.Router()
const TaskBoard = require('../models/TaskBoard')
const TaskStage = require('../models/TaskStage')
const { saveTaskBoard, removeTaskBoard } = require('../controllers/TaskBoardController')
const { saveTaskStage, removeTaskStage } = require('../controllers/TaskStageController')

// get all taskboards
router.get('/list', async (req, res) => {
  try {
    const taskBoards = await TaskBoard.find()
    console.log("Fetched TaskBoard List")
    res.json({data: taskBoards, success: true, message: "Fetched TaskBoard List"})
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// fetch taskboard tasks
router.post('/details', async (req, res) => {
  try {
    let taskBoard = await getTaskBoardDetails(req.body._id)
    if (taskBoard == null) {
      return res.status(404).json({ success: false, message: 'Cannot Find TaskBoard' })
    }
    console.log("Fetched TaskBoard")
    res.json({data: taskBoard, success: true, message: "Fetched TaskBoard"})
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
  })

// create taskboard
router.post('/add', async (req, res) => {
  const taskBoard = new TaskBoard({
    name: req.body.name,
    stages: req.body.stages
  })
  try {
    await saveTaskBoard(taskBoard)
    const taskBoardList = await TaskBoard.find()
    res.status(201).json({data: taskBoardList, success: true, message: 'Added TaskBoard'})
    console.log('Added TaskBoard')
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
    console.log(req.body.name)
  }
})

// update taskboard
router.post('/edit', async (req, res) => {
  try {
    let replacement = {}
    if(req.body.name) replacement['name'] = req.body.name
    if(req.body.stages) replacement['stages'] = req.body.stages

    await TaskBoard.updateOne({_id: req.body._id}, replacement)
    const taskBoardList = await TaskBoard.find()
    res.json({data: taskBoardList, success: true, message: 'Updated TaskBoard'})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// delete taskboard
router.post('/remove', async (req, res) => {
  try {
    await removeTaskBoard(req.body._id)

    const taskBoardList = await TaskBoard.find()
    res.json({ data: taskBoardList, success: true, message: 'Deleted TaskBoard' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// task stage endpoints
router.post('/add-task-stage', async (req, res) => {
  const taskStage = new TaskStage({
    name: req.body.name,
    position: req.body.position,
    taskBoardId: req.body.taskBoardId
  })
  try {
    await saveTaskStage(taskStage)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.status(201).json({data: taskBoardDetails, success: true, message: 'Added Task Stage'})
    console.log('Added Task Stage')
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
    console.log(req.body.name)
  }
})

router.post('/edit-task-stage', async (req, res) => {
  try {
    let replacement = {}
    if(req.body.name) replacement['name'] = req.body.name
    if(req.body.position) replacement['position'] = req.body.postion

    await TaskStage.updateOne({_id: req.body._id}, replacement)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.json({data: taskBoardDetails, success: true, message: 'Updated Task Stage'})
    console.log('Updated Task Stage')
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.post('/remove-task-stage', async (req, res) => {
  try {
    // delete all tasks in stage
    await removeTaskStage(req.body._id)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.json({data: taskBoardDetails, success: true, message: 'Deleted Task Stage'})
    console.log('Deleted Task Stage')
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

async function getTaskBoardDetails(taskBoardId) {
  let taskBoard = await TaskBoard
        .findOne({_id: taskBoardId})
        .populate(
          {
            path: 'stages',
            populate: {
                path: 'tasks',
                model: 'Task'
            }
          })
  return taskBoard
}

module.exports = router