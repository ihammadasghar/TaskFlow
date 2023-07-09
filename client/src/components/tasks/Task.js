import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, Typography, Button, CardActionArea, CardActions, List, ListItem, ListItemText } from "@mui/material";
import { ArrowForward, ArrowBack, Comment as CommentIcon } from '@mui/icons-material';
import { editTask, getTaskDetails } from "../../store/taskboards/actions";
import { useTheme } from "@emotion/react";
import { uiActions } from "../../store/ui/slice";

const Task = ({ task, stage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const taskBoard = useSelector((state) => state.taskBoards.loadedTaskBoard);

    const updateStage = (updateBy) => dispatch(editTask({ _id: task._id, stageId: taskBoard.stages[stage.position + updateBy]._id }));
    const viewDetails = () => {
        dispatch(getTaskDetails(task._id))
        dispatch(uiActions.toggle("taskDetailsModalToggle"));
    }
    return (
        <Card
            sx={{
                width: "100%",
                bgcolor: "background.lighter",
                cursor: 'move',
                borderColor: "white"
            }}
        >
            <CardActionArea>
                <CardContent
                    sx={{ p: 0 }}
                >
                    <List
                        sx={{ bgcolor: 'background.lighter' }}
                        onClick={viewDetails}
                    >
                        <ListItem
                            secondaryAction={
                                <>
                                    <Button
                                        sx={{ bgcolor: 'background.light', borderRadius: 10 }}
                                        variant="contained"
                                        startIcon={<CommentIcon style={{ fill: theme.palette.onBackground.main }} />}
                                    >
                                        {task && task.comments.length}
                                    </Button>
                                    {/* <IconButton aria-label="edit">
                        <Comment
                            style={{ fill: theme.palette.onBackground.main }}
                            />
                        </IconButton> */}
                                </>
                            }
                        >
                            <ListItemText
                                disableTypography
                                color="onBackground.main"
                                primary={
                                    <Typography
                                        color="onBackground.main"
                                        component="b"
                                        variant="p">
                                        {task.header}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem>

                            <ListItemText
                                disableTypography
                                color="onBackground.main"
                                primary={task.updatedAt ?
                                    <Typography variant="p" color="onBackground.main">
                                        Last updated at {task.updatedAt}
                                    </Typography>
                                    :
                                    <Typography variant="p" color="onBackground.dim">
                                        Created at {task.createdAt}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </CardActionArea>
            <CardActions>

                {stage.position !== 0 &&
                    <Button
                        sx={{
                            width: "100%",
                        }}
                        color="onBackground"
                        onClick={() => updateStage(-1)}
                    >
                        <ArrowBack style={theme.styles.iconOnBackground} />
                    </Button>
                }

                {stage.position !== (taskBoard.stages.length - 1) &&
                    <Button
                        sx={{
                            width: "100%",
                        }}
                        color="onBackground"
                        onClick={() => updateStage(1)}
                    >
                        <ArrowForward style={theme.styles.iconOnBackground} />
                    </Button>
                }
            </CardActions>
        </Card>
    )
}

export default Task;