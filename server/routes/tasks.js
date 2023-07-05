const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', getTask, (req, res) => {
  res.json(res.task)
})


router.post('/', async (req, res) => {
  const task = new Task(req.body)
  try {
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.patch('/:id', async (req, res) => {
  try {
    let replacement = {...req.body, updatedAt: Date.now()}
    const updatedTask = await Task.updateOne({_id: req.params.id}, replacement)
    res.json(updatedTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    await Task.deleteOne({_id: req.params.id})
    res.json({ message: 'Deleted Task' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTask(req, res, next) {
  let task
  try {
    task = await Task.findById(req.params.id)
    if (task == null) {
      return res.status(404).json({ message: 'Cannot find task' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.task = task
  next()
}

module.exports = router