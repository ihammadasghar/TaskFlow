import { useSelector, useDispatch } from 'react-redux';
import { React, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemAvatar, IconButton, Avatar, ListItemText, Backdrop, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { addTaskBoard, editTaskBoard, getTaskBoardDetails, getTaskBoardList, removeTaskBoard } from '../../store/taskboards/actions';
import FolderIcon from '@mui/icons-material/Folder';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { uiActions } from '../../store/ui/slice';
import EditField from '../utility/EditField';
import NewField from '../utility/NewField';

const TaskBoardManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const allTaskBoards = useSelector((state) => state.taskBoards.allTaskBoards);

    useEffect(() => {
        dispatch(getTaskBoardList());
    }, [dispatch]);

    const isEditingTaskBoard = useSelector((state) => state.ui.isEditingTaskBoard);
    const editTaskBoardForm = useSelector((state) => state.ui.editTaskBoardForm);
    const editNameSubmit = (event) => {
        event.preventDefault();
        dispatch(uiActions.setState({ stateName: "isEditingTaskBoard", value: false }));
        dispatch(
            editTaskBoard(
                {
                    _id: editTaskBoardForm._id,
                    name: editTaskBoardForm.name
                }
            )
        );
    }
    const editNameHandleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "editTaskBoardForm", field, value }));
    const switchToEditNameView = (id, name) => {
        dispatch(uiActions.setState({ stateName: "editTaskBoardForm", value: { _id: id, name } }));
        dispatch(uiActions.setState({ stateName: "isEditingTaskBoard", value: true }));
    }

    const taskBoardForm = useSelector((state) => state.ui.taskBoardForm);
    const addTaskBoardHandleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "taskBoardForm", field: field, value: value }));
    const addTaskBoardSubmit = (event) => {
        event.preventDefault();
        dispatch(addTaskBoard({ name: taskBoardForm.name }));
        dispatch(uiActions.setFormValue({ form: "taskBoardForm", field: 'name', value: "" }));
    }

    return (
        <Container component="main" maxWidth="md">
            {
                allTaskBoards.length !== 0 ? (
                    <>
                        <List
                            sx={{ bgcolor: 'background.primary' }}
                        >
                            <ListItem
                                key="taskBoardManagerHeading"
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "background.highlight" }}>
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
                            sx={{ bgcolor: 'background.primary' }}
                        >

                            <ListItem key="newTaskFieldListItem">
                                <NewField
                                    placeholder="Type a name"
                                    name={"name"}
                                    value={taskBoardForm["name"]}
                                    handleChangeFunc={addTaskBoardHandleChange}
                                    submitFunc={addTaskBoardSubmit}
                                />
                            </ListItem>

                            {allTaskBoards.length !== 0 ?
                                (allTaskBoards.map((t) => (
                                    <ListItem
                                        key={`taskBoard${t._id}ListItem`}
                                        secondaryAction={
                                            <>
                                                <IconButton
                                                    aria-label="edit"
                                                    onClick={() => switchToEditNameView(t._id, t.name)}
                                                >
                                                    <EditIcon
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
                                            <Avatar sx={{ bgcolor: "background.highlight" }}>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        {isEditingTaskBoard && t._id === editTaskBoardForm._id ? (
                                            <EditField
                                                name={"name"}
                                                value={editTaskBoardForm.name}
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
                    </>
                )
                    :
                    (
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={true}
                        >
                            <CircularProgress color="primary" />
                        </Backdrop>
                    )
            }

        </Container >
    )
}

export default TaskBoardManager;