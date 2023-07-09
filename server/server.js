require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to Database"))

app.use(express.json())

const tasksRouter = require('./routes/TaskRoutes')
const taskBoardRouter = require('./routes/TaskBoardRoutes')
const commentRouter = require('./routes/CommentRoutes')

app.use('/api/tasks', tasksRouter)
app.use('/api/taskboards', taskBoardRouter)
app.use('/api/comments', commentRouter)

app.listen(5000, () => console.log("TaskFlow Server Started"))