const CommentModel = require("../models/Comment");
const TaskModel = require("../models/Task");
const TaskStageModel = require("../models/TaskStage");

async function removeTask(id){
    const t = await TaskModel.findById(id)
    await TaskModel.deleteOne({
        _id: id
    })
    await CommentModel.deleteMany({
        taskId: id
    })
    await TaskStageModel.updateOne(
        {
            _id: t.stageId,
        },
        {
            tasks: {
                $pull: id
            }
        }
    )
}

async function removeManyTask(taskIds){
    await TaskModel.deleteMany({
        _id: {
            $in: taskIds
        }
    })
    await CommentModel.deleteMany({
        taskId: {
            $in: taskIds
        }
    })
}

async function saveTask(task){
    await task.save()
    .then(t => {
        TaskStageModel.updateOne(
            {
                _id: t.stageId,
            },
            {
                tasks: {
                    $push: t._id
                }
            }
        ) 
    })
}

module.exports = { saveTask, removeTask, removeManyTask }