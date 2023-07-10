const TaskBoardModel = require("../models/TaskBoard");
const { removeManyTaskStage } = require("./TaskStageController");

async function getTaskBoardList() {
    return await TaskBoardModel.find()
}

async function removeTaskBoard(id) {
    const t = await TaskBoardModel.findById(id)

    await TaskBoardModel.deleteOne({
        _id: t._id
    })

    await removeManyTaskStage(t.stages)
}

async function saveTaskBoard(taskBoard) {
    const newTaskBoard = new TaskBoardModel(taskBoard)
    await newTaskBoard.save()
}

async function updateTaskBoard(taskBoard) {
    await TaskBoardModel.updateOne({ _id: taskBoard._id }, taskBoard)
}

async function getTaskBoardDetails(id) {
    let taskBoard = await TaskBoardModel
        .findById(id)
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

module.exports = { saveTaskBoard, removeTaskBoard, getTaskBoardDetails, getTaskBoardList, updateTaskBoard }
