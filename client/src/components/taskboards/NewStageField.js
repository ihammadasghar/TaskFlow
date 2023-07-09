import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { uiActions } from '../../store/ui/slice';
import { addTaskBoardStage } from "../../store/taskboards/actions";

import { Card, CardContent, Paper, InputBase, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const NewStageField = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const stageForm = useSelector((state) => state.ui.stageForm);
    const handleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "stageForm", field: field, value: value }));
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addTaskBoardStage(stageForm));
        dispatch(uiActions.setFormValue({ form: "stageForm", field: 'name', value: "" }));
    }
    return (
        <Card
            key={`newTaskStage`}
            sx={{
                bgcolor: "background.main",
                borderRadius: "3px",
                mr: 2,
                height: "80vh",
                minWidth: { xs: "80%", md: "23%" }
            }}
        >
            <CardContent sx={{ p: 0 }}>
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
                        placeholder="New task stage"
                        value={stageForm[`name`]}
                        onChange={(e) => handleChange(`name`, e.target.value)}
                        inputProps={{ 'aria-label': 'new stage' }}
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
            </CardContent>
        </Card>

    )
}

export default NewStageField;