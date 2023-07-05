const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
    res.json(comments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', getComment, (req, res) => {
  res.json(res.comment)
})


router.post('/', async (req, res) => {
  const comment = new Comment(req.body)
  try {
    const newComment = await comment.save()
    res.status(201).json(newComment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.patch('/:id', async (req, res) => {
  try {
    let replacement = {...req.body, updatedAt: Date.now()}
    const updatedComment = await Comment.updateOne({_id: req.params.id}, replacement)
    res.json(updatedComment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    await Comment.deleteOne({_id: req.params.id})
    res.json({ message: 'Deleted Comment' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getComment(req, res, next) {
  let comment
  try {
    comment = await Comment.findById(req.params.id)
    if (comment == null) {
      return res.status(404).json({ message: 'Cannot find comment' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.comment = comment
  next()
}

module.exports = router