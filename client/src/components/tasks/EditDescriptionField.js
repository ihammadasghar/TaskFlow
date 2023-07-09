import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../store/taskboards/actions";
import { uiActions } from "../../store/ui/slice";

import { Paper, InputBase } from "@mui/material";

const EditDescriptionField = ({ task }) => {
    const dispatch = useDispatch();
    const taskForm = useSelector((state) => state.ui.editTaskForm);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(uiActions.setState({ stateName: "isEditingTaskDescription", value: false }));
        dispatch(
            editTask(
                {
                    _id: task._id,
                    description: taskForm.description
                }
            )
        );
    }
    const handleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "editTaskForm", field, value }));

    return (
        <Paper
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                mb: 2,
                bgcolor: "onBackground.textField"
            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    color: "onBackground.main",
                }}
                placeholder="description"
                value={taskForm.description}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={handleSubmit}
                inputProps={{ 'aria-label': "description" }}
                minRows={5}
                multiline
            />
        </Paper>

    )
}

export default EditDescriptionField;