import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { uiActions } from '../../store/ui/slice';
import { addTaskBoard } from "../../store/taskboards/actions";

import { Paper, InputBase, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const NewTaskBoardField = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const taskBoardForm = useSelector((state) => state.ui.taskBoardForm);
    const handleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "taskBoardForm", field: field, value: value }));
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addTaskBoard({ name: taskBoardForm.name }));
        dispatch(uiActions.setFormValue({ form: "taskBoardForm", field: 'name', value: "" }));
    }
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                bgcolor: "onBackground.textField",
            }}
            onSubmit={handleSubmit}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, color: "onBackground.main" }}
                placeholder="Type a name"
                value={taskBoardForm["name"]}
                onChange={(e) => handleChange(`name`, e.target.value)}
                inputProps={{ 'aria-label': 'new taskboard' }}
            />
            <IconButton
                type="submit"
                sx={{ p: 2 }}
                aria-label="add"
            >
                <AddIcon
                    style={{ fill: theme.palette.onBackground.main }}
                />
            </IconButton>
        </Paper>

    )
}

export default NewTaskBoardField;