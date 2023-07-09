const express = require('express')
const router = express.Router()
const { saveTask, removeTask, updateTask, getTaskDetails } = require('../controllers/TaskController')
const { getTaskBoardDetails } = require('../controllers/TaskBoardController')

// get task
router.post('/details', async (req, res) => {
  try {
    const taskDetails = await getTaskDetails(req.body._id)
    res.json({ data: taskDetails, success: true, message: "Fetched Task" })
    console.log("Fetched Task")
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

router.post('/add', async (req, res) => {
  const task = {
    header: req.body.header,
    stageId: req.body.stageId,
  }
  try {
    await saveTask(task)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.status(201).json({ data: taskBoardDetails, success: true, message: 'Added Task' })
    console.log("Added Task")
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
})

router.post('/edit', async (req, res) => {
  try {
    let replacement = {
      _id: req.body._id,
      updatedAt: Date.now()
    }
    if (req.body.header) replacement['header'] = req.body.header
    if (req.body.description) replacement['description'] = req.body.description
    if (req.body.stageId) replacement['stageId'] = req.body.stageId

    await updateTask(replacement)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.json({ data: taskBoardDetails, success: true, message: 'Updated Task' })
    console.log("Updated Task")
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
    console.log(err.message)
  }
})

router.post('/remove', async (req, res) => {
  try {
    await removeTask(req.body._id)

    const taskBoardDetails = await getTaskBoardDetails(req.body.taskBoardId)
    res.json({ data: taskBoardDetails, success: true, message: 'Deleted Task' })
    console.log('Deleted Task')
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router
