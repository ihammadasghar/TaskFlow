import { useDispatch, useSelector } from "react-redux";
import { addTask, editTaskBoardStage, removeTaskBoardStage } from "../../store/taskboards/actions";

import { Typography, Card, CardContent, List, ListItem, ListItemText, IconButton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import Task from "../tasks/Task";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from "@emotion/react";
import { uiActions } from "../../store/ui/slice";
import EditField from "../utility/EditField";
import NewField from "../utility/NewField";

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


    const taskForm = useSelector((state) => state.ui.taskForm);
    const addTaskHandleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "taskForm", field: field, value: value }));
    const addTaskSubmit = (event) => {
        event.preventDefault();
        dispatch(addTask({ header: taskForm[`stage${stage._id}`], description: "", stageId: stage._id }));
        dispatch(uiActions.setFormValue({ form: "taskForm", field: `stage${stage._id}`, value: "" }));
    }

    return (
        <Card
            key={`taskStage${stage.position}`}
            sx={{
                bgcolor: "background.primary",
                borderRadius: "3px",
                mr: 2,
                my: 2,
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
                        {canAddTask && <NewField
                            placeholder="Type a new task"
                            name={`stage${stage._id}`}
                            value={taskForm[`stage${stage._id}`]}
                            handleChangeFunc={addTaskHandleChange}
                            submitFunc={addTaskSubmit}
                        />}
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