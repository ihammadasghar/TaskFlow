const CommentModel = require("../models/Comment")
const TaskModel = require("../models/Task")

async function saveComment(comment) {
    const newComment = CommentModel(comment)
    await newComment.save()
        .then(c => (
            TaskModel.updateOne(
                {
                    _id: c.taskId,
                },
                {
                    $push: {
                        comments: c._id
                    }
                }
            )
        ))
}

async function updateComment(comment) {
    Comment.updateOne({ _id: comment._id }, comment)
}

async function removeComment(id) {
    const c = await CommentModel.findById(id)
    await CommentModel.deleteOne({
        _id: id
    })
    await TaskModel.updateOne(
        {
            _id: c.taskId,
        },
        {
            $pull: {
                comments: c._id
            }
        }
    )
}

module.exports = { saveComment, removeComment, updateComment }