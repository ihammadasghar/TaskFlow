const CommentModel = require("../models/Comment")
const TaskModel = require("../models/Task")

async function saveComment(comment){
    await comment.save()
    .then(c => {
        TaskModel.updateOne(
            {
                _id: c.taskId,
            },
            {
                comments: {
                    $push: c._id
                }
            }
        ) 
    })
}

async function removeComment(id){
    const c = await CommentModel.findById(id)
    await CommentModel.deleteOne({
        _id: id
    })
    await TaskModel.updateOne(
        {
            _id: c.taskId,
        },
        {
            comments: {
                $pull: c._id
            }
        }
    ) 
}

module.exports = { saveComment, removeComment }