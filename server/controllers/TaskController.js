const CommentModel = require("../models/Comment");
const TaskModel = require("../models/Task");
const TaskStageModel = require("../models/TaskStage");

async function removeTask(id) {
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
            $pull: {
                tasks: id
            }
        }
    )
}

async function removeManyTask(taskIds) {
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

async function saveTask(task) {
    await task.save()
        .then(t => (
            TaskStageModel.updateOne(
                {
                    _id: task.stageId,
                },
                {
                    $push: {
                        tasks: t._id
                    }
                }
            )
        ))
}

async function updateTask(task) {
    const t = await TaskModel.findByIdAndUpdate(task._id, task)

    //remove from old stage
    if (task.stageId) {
        await TaskStageModel.updateOne(
            {
                _id: t.stageId,
            },
            {
                $pull: {
                    tasks: t._id
                }
            }
        )

        // add to new stage
        await TaskStageModel.updateOne(
            {
                _id: task.stageId,
            },
            {
                $push: {
                    tasks: task._id
                }
            }
        )
    }
}

module.exports = { saveTask, removeTask, removeManyTask, updateTask }