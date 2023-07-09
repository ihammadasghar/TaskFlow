import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { editTask, removeTask } from "../../store/taskboards/actions";

import { IconButton, Container, Modal, Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import CommentSection from "../comments/CommentSection";
import { uiActions } from "../../store/ui/slice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditDescriptionField from "./EditDescriptionField";
import EditField from "../utility/EditField";

const style = {
    position: 'absolute',
    transform: 'translate(-50%, -20%)',
    width: { xs: "90%", md: "50%" },
    bgcolor: 'background.secondary',
    boxShadow: 24,
    top: '20%',
    left: '50%',
    overflow: 'auto',
    height: "90%",
    display: 'block'
};

const TaskDetailModal = () => {
    const task = useSelector((state) => state.taskBoards.loadedTask);
    const isEditingTaskHeader = useSelector((state) => state.ui.isEditingTaskHeader);
    const isEditingTaskDescription = useSelector((state) => state.ui.isEditingTaskDescription);
    const isOpen = useSelector((state) => state.ui.taskDetailsModalToggle);
    const theme = useTheme();
    const dispatch = useDispatch();

    const taskForm = useSelector((state) => state.ui.editTaskForm);

    const editHeaderSubmit = (event) => {
        event.preventDefault();
        dispatch(uiActions.setState({ stateName: "isEditingTaskHeader", value: false }));
        dispatch(
            editTask(
                {
                    _id: task._id,
                    header: taskForm.header
                }
            )
        );
    }
    const editHeaderHandleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "editTaskForm", field, value }));

    const switchToEditDescriptionView = () => {
        dispatch(uiActions.setState({ stateName: "editTaskForm", value: { header: "", description: task?.description } }));
        dispatch(uiActions.setState({ stateName: "isEditingTaskDescription", value: true }));
    }
    const switchToEditHeaderView = () => {
        dispatch(uiActions.setState({ stateName: "editTaskForm", value: { header: task?.header, description: "" } }));
        dispatch(uiActions.setState({ stateName: "isEditingTaskHeader", value: true }));
    }
    return (
        <Modal
            open={isOpen}
            onClose={() => { dispatch(uiActions.toggle("taskDetailsModalToggle")); dispatch(uiActions.setState({ name: "editTaskView", value: false })) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ bgcolor: "grey" }}
        >
            <Container component="main" maxWidth="sm">
                <Card sx={style}>
                    <CardContent>
                        <Card
                            sx={{
                                bgcolor: 'background.highlight'
                            }}
                        >
                            <CardContent
                                sx={{ p: 0 }}
                            >
                                <List
                                    sx={{ bgcolor: 'background.highlight' }}
                                >
                                    <ListItem
                                        secondaryAction={
                                            <>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => dispatch(removeTask(task._id))}
                                                >
                                                    <DeleteIcon
                                                        style={{ fill: theme.palette.onBackground.main }}
                                                    />
                                                </IconButton>
                                            </>
                                        }
                                    >
                                        {isEditingTaskHeader ? (
                                            <EditField
                                                name={"header"}
                                                value={taskForm.name}
                                                handleChangeFunc={editHeaderHandleChange}
                                                submitFunc={editHeaderSubmit}
                                            />
                                        )
                                            :
                                            (
                                                <ListItemText
                                                    onClick={switchToEditHeaderView}
                                                    disableTypography
                                                    color="onBackground.main"
                                                    primary={
                                                        <Typography
                                                            color="onBackground.main"
                                                            component="b"
                                                            variant="p">
                                                            {task && task.header}
                                                        </Typography>
                                                    }
                                                />

                                            )
                                        }

                                    </ListItem>

                                    <ListItem>
                                        {isEditingTaskDescription ? (
                                            <EditDescriptionField task={task} />
                                        )
                                            :
                                            (
                                                <ListItemText
                                                    onClick={switchToEditDescriptionView}
                                                    disableTypography
                                                    color="onBackground.main"
                                                    primary={
                                                        <Typography
                                                            color="onBackground.main"
                                                            variant="p">
                                                            {task && task.description}
                                                        </Typography>
                                                    }
                                                />

                                            )
                                        }

                                    </ListItem>

                                    <ListItem>

                                        <ListItemText
                                            disableTypography
                                            color="onBackground.main"
                                            primary={task && task.updatedAt ?
                                                <Typography variant="p" color="onBackground.main">
                                                    Last updated at {task.updatedAt}
                                                </Typography>
                                                :
                                                <Typography variant="p" color="onBackground.dim">
                                                    Created at {task && task.createdAt}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                        {task && <CommentSection />}
                    </CardContent>
                </Card>
            </Container>
        </Modal>
    )
}

export default TaskDetailModal;