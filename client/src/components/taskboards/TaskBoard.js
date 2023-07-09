import { React } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

import { Box, Container, Typography, List, ListItem, ListItemAvatar, IconButton, Avatar, ListItemText } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';

import TaskDetailModal from "../tasks/TaskDetailModal";
import Stage from './Stage';
import { editTaskBoard, removeTaskBoard } from '../../store/taskboards/actions';
import { uiActions } from '../../store/ui/slice';
import EditField from '../utility/EditField';
import NewStageCard from './NewStageCard';


const TaskBoard = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const taskBoard = useSelector((state) => state.taskBoards.loadedTaskBoard);

    const detailsModalToggle = useSelector((state) => state.ui.taskDetailsModalToggle);
    const taskStages = [];
    if (taskBoard) {
        for (let i = 0; i < taskBoard.stages.length; i++) {
            taskStages.push(<Stage stage={taskBoard.stages[i]} />)
        }
    }

    const isEditingTaskBoard = useSelector((state) => state.ui.isEditingTaskBoard);
    const taskBoardForm = useSelector((state) => state.ui.editTaskBoardForm);
    const editNameSubmit = (event) => {
        event.preventDefault();
        dispatch(uiActions.setState({ stateName: "isEditingTaskBoard", value: false }));
        dispatch(
            editTaskBoard(
                {
                    _id: taskBoard._id,
                    name: taskBoardForm.name
                }
            )
        );
    }
    const editNameHandleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "editTaskBoardForm", field, value }));
    const switchToEditNameView = () => {
        dispatch(uiActions.setState({ stateName: "editTaskBoardForm", value: { name: taskBoard?.name } }));
        dispatch(uiActions.setState({ stateName: "isEditingTaskBoard", value: true }));
    }

    return (
        <Container component="main" maxWidth="lg" sx={{ mb: 2 }}>
            {detailsModalToggle && <TaskDetailModal />}
            <List
                sx={{ bgcolor: 'background.light' }}
            >
                <ListItem
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => dispatch(removeTaskBoard(taskBoard._id))}
                        >
                            <DeleteIcon
                                style={{ fill: theme.palette.onBackground.main }}
                            />
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ListIcon />
                        </Avatar>
                    </ListItemAvatar>

                    {(isEditingTaskBoard) ? (
                        <EditField
                            name={"name"}
                            value={taskBoardForm.name}
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
                                        variant="h6">
                                        {taskBoard && taskBoard.name}
                                    </Typography>
                                }
                            />

                        )
                    }

                </ListItem>
            </List>
            <Box
                sx={{
                    display: 'flex',
                    mb: 2,
                    overflowX: "scroll",
                }}
            >
                {taskStages}
                <NewStageCard />
            </Box>
        </Container>
    )
}

export default TaskBoard;