const express = require('express')
const router = express.Router()
const { saveTaskBoard, removeTaskBoard, getTaskBoardList, getTaskBoardDetails, updateTaskBoard } = require('../controllers/TaskBoardController')
const { saveTaskStage, removeTaskStage, updateTaskStage } = require('../controllers/TaskStageController')

// get all taskboards
router.get('/list', async (req, res) => {
  try {
    const taskBoards = await getTaskBoardList()
    console.log("Fetched TaskBoard List")
    res.json({ data: taskBoards, success: true, message: "Fetched TaskBoard List" })
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
    res.json({ data: taskBoard, success: true, message: "Fetched TaskBoard" })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
})

// create taskboard
router.post('/add', async (req, res) => {
  const taskBoard = {
    name: req.body.name
  }
  try {
    await saveTaskBoard(taskBoard)

    const taskBoardList = await getTaskBoardList()
    res.status(201).json({ data: taskBoardList, success: true, message: 'Added TaskBoard' })
    console.log('Added TaskBoard')
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
    console.log(err.message)
  }
})

// update taskboard
router.post('/edit', async (req, res) => {
  console.log(req.body)
  try {
    let replacement = {
      _id: req.body._id
    }
    if (req.body.name) replacement['name'] = req.body.name

    await updateTaskBoard(replacement)
    const taskBoardList = await getTaskBoardList()
    res.json({ data: taskBoardList, success: true, message: 'Updated TaskBoard' })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

// delete taskboard
router.post('/remove', async (req, res) => {
  try {
    await removeTaskBoard(req.body._id)

    const taskBoardList = await getTaskBoardList()
    res.json({ data: taskBoardList, success: true, message: 'Deleted TaskBoard' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// task stage endpoints
router.post('/add-task-stage', async (req, res) => {
  const taskStage = {
    name: req.body.name,
    position: req.body.position,
    taskBoardId: req.body.taskBoardId
  }
  try {
    await saveTaskStage(taskStage)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.status(201).json({ data: taskBoardDetails, success: true, message: 'Added Task Stage' })
    console.log('Added Task Stage')
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
    console.log(err.message)
  }
})

router.post('/edit-task-stage', async (req, res) => {
  try {
    let replacement = {
      _id: req.body._id
    }
    if (req.body.name) replacement['name'] = req.body.name
    if (req.body.position) replacement['position'] = req.body.postion

    await updateTaskStage(replacement)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.json({ data: taskBoardDetails, success: true, message: 'Updated Task Stage' })
    console.log('Updated Task Stage')
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.post('/remove-task-stage', async (req, res) => {
  try {
    await removeTaskStage(req.body._id)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.json({ data: taskBoardDetails, success: true, message: 'Deleted Task Stage' })
    console.log('Deleted Task Stage')
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
