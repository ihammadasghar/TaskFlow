import { useSelector, useDispatch } from 'react-redux';
import { React, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemAvatar, IconButton, Avatar, ListItemText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { editTaskBoard, getTaskBoardDetails, getTaskBoardList, removeTaskBoard } from '../../store/taskboards/actions';
import FolderIcon from '@mui/icons-material/Folder';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import NewTaskBoardField from './NewTaskBoardField';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { uiActions } from '../../store/ui/slice';
import EditField from '../utility/EditField';

const TaskBoardManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const allTaskBoards = useSelector((state) => state.taskBoards.allTaskBoards);

    useEffect(() => {
        dispatch(getTaskBoardList());
    }, [dispatch]);

    const isEditingTaskBoard = useSelector((state) => state.ui.isEditingTaskBoard);
    const taskBoardForm = useSelector((state) => state.ui.editTaskBoardForm);
    const editNameSubmit = (event) => {
        event.preventDefault();
        dispatch(uiActions.setState({ stateName: "isEditingTaskBoard", value: false }));
        dispatch(
            editTaskBoard(
                {
                    _id: taskBoardForm._id,
                    name: taskBoardForm.name
                }
            )
        );
    }
    const editNameHandleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "editTaskBoardForm", field, value }));
    const switchToEditNameView = (id, name) => {
        dispatch(uiActions.setState({ stateName: "editTaskBoardForm", value: { _id: id, name } }));
        dispatch(uiActions.setState({ stateName: "isEditingTaskBoard", value: true }));
    }

    return (
        <Container component="main" maxWidth="md">
            <List
                sx={{ bgcolor: 'background.light' }}
            >
                <ListItem
                    key="taskBoardManagerHeading"
                    secondaryAction={
                        <IconButton edge="end" aria-label="add">
                            <AddIcon />
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ListIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        color="onBackground.main"
                        primary={
                            <Typography
                                color="onBackground.main"
                                variant="h6">
                                Manage TaskBoards
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
            <List
                sx={{ bgcolor: 'background.main' }}
            >

                <ListItem key="newTaskFieldListItem">
                    <NewTaskBoardField />
                </ListItem>

                {allTaskBoards.length !== 0 ?
                    (allTaskBoards.map((t) => (
                        <ListItem
                            key={`taskBoard${t._id}ListItem`}
                            secondaryAction={
                                <>
                                    <IconButton aria-label="edit">
                                        <EditIcon
                                            onClick={() => switchToEditNameView(t._id, t.name)}
                                            style={{ fill: theme.palette.onBackground.main }}
                                        />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => dispatch(removeTaskBoard(t._id))}
                                    >
                                        <DeleteIcon
                                            style={{ fill: theme.palette.onBackground.main }}
                                        />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemAvatar
                                onClick={() => {
                                    dispatch(getTaskBoardDetails(t._id))
                                    navigate('/taskboard')
                                }}
                            >
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            {isEditingTaskBoard && t._id === taskBoardForm._id ? (
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
                                        onClick={() => {
                                            dispatch(getTaskBoardDetails(t._id))
                                            navigate('/taskboard')
                                        }}
                                        color="onBackground.main"
                                        primary={
                                            <Typography
                                                color="onBackground.main"
                                            >
                                                {t.name}
                                            </Typography>
                                        }
                                    />


                                )}
                        </ListItem>

                    ))) :
                    (
                        <Grid xs={12}>
                            <Typography gutterBottom variant="h6" color="onBackground.main" component="div" sx={{ my: 5 }} align="center">No TaskBoards</Typography>
                        </Grid>
                    )
                }
            </List>
        </Container >
    )
}

export default TaskBoardManager;