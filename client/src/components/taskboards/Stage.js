import { useDispatch, useSelector } from "react-redux";
import { editTaskBoardStage, removeTaskBoardStage } from "../../store/taskboards/actions";

import { Typography, Card, CardContent, List, ListItem, ListItemText, IconButton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import NewTaskField from "../tasks/NewTaskField";
import Task from "../tasks/Task";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { uiActions } from "../../store/ui/slice";
import EditField from "../utility/EditField";

const Stage = ({ stage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const tasks = stage.tasks;
    const canAddTask = true;

    const isEditingTaskStage = useSelector((state) => state.ui.isEditingTaskStage);
    const taskStageForm = useSelector((state) => state.ui.editTaskStageForm);
    const editNameSubmit = (event) => {
        event.preventDefault();
        dispatch(uiActions.setState({ stateName: "isEditingTaskStage", value: false }));
        dispatch(
            editTaskBoardStage(
                {
                    _id: stage._id,
                    name: taskStageForm.name
                }
            )
        );
    }
    const editNameHandleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "editTaskStageForm", field, value }));
    const switchToEditNameView = () => {
        dispatch(uiActions.setState({ stateName: "editTaskStageForm", value: { _id: stage?._id, name: stage?.name } }));
        dispatch(uiActions.setState({ stateName: "isEditingTaskStage", value: true }));
    }

    return (
        <Card
            key={`taskStage${stage.position}`}
            sx={{
                bgcolor: "background.main",
                borderRadius: "3px",
                mr: 2,
                height: "auto",
                minWidth: { xs: "80%", md: "23%" }
            }}
        >
            <CardContent sx={{ p: 0 }}>

                <List
                    sx={{
                        height: "70vh",
                        overflowY: "auto",
                    }}
                >
                    <ListItem
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => dispatch(removeTaskBoardStage(stage._id))}
                            >
                                <DeleteIcon
                                    style={{ fill: theme.palette.onBackground.main }}
                                />
                            </IconButton>
                        }
                    >
                        {(isEditingTaskStage && taskStageForm._id === stage._id) ? (
                            <EditField
                                name={"name"}
                                value={taskStageForm.name}
                                handleChangeFunc={editNameHandleChange}
                                submitFunc={editNameSubmit}
                            />
                        )
                            :
                            (
                                <ListItemText
                                    onClick={switchToEditNameView}
                                    disableTypography
                                    color="onBackground.main"
                                    primary={
                                        <Typography
                                            color="onBackground.main"
                                            variant="p">
                                            {stage.name}
                                        </Typography>
                                    }
                                />

                            )
                        }

                    </ListItem>
                    <ListItem key={`addtask${stage.position}`}>
                        {canAddTask && <NewTaskField stageId={stage._id} />}
                    </ListItem>

                    {tasks.length !== 0 ?
                        (tasks.map((task) => (
                            <ListItem key={`task${task.id}`}>
                                <Task task={task} stage={stage} />
                            </ListItem>

                        ))) :
                        (
                            <Grid xs={12}>
                                <Typography gutterBottom variant="h6" color="onBackground.main" component="div" sx={{ my: 5 }} align="center">No tasks</Typography>
                            </Grid>
                        )
                    }

                </List>
            </CardContent>
        </Card>
    )
}

export default Stage;