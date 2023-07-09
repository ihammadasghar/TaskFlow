const TaskBoardModel = require("../models/TaskBoard");
const { removeManyTaskStage } = require("./TaskStageController");

async function removeTaskBoard(id) {
    const t = await TaskBoardModel.findById(id)

    await TaskBoardModel.deleteOne({
        _id: t._id
    })

    await removeManyTaskStage(t.stages)
}

async function saveTaskBoard(taskBoard) {
    await taskBoard.save()
}

module.exports = { saveTaskBoard, removeTaskBoard }