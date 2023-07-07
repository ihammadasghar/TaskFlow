const TaskBoardModel = require("../models/TaskBoard");
const { removeManyTask } = require("./TaskController");
const TaskStageModel = require("../models/TaskStage");

async function removeTaskStage(id){
    const t = await TaskStageModel.findById(id)

    await TaskStageModel.deleteOne({
        _id: t._id
    })

    await removeManyTask(t.tasks)

    await TaskBoardModel.updateOne(
        {
            _id: t.taskBoardId,
        },
        {
            stages: {
                $pull: id
            }
        }
    )
}

async function removeManyTaskStage(taskStageIds){
    for(let id of taskStageIds){
        const t = await TaskStageModel.findById(id)
        await removeManyTask(t.tasks)
    }

    await TaskStageModel.deleteMany({
        _id: {
            $in: taskStageIds
        }
    })
    
}

async function saveTaskStage(taskStage){
    await taskStage.save()
    .then(t => {
        TaskBoardModel.updateOne(
            {
                _id: t.taskBoardId,
            },
            {
                stages: {
                    $push: t._id
                }
            }
        ) 
    })
}

module.exports = { saveTaskStage, removeTaskStage, removeManyTaskStage }