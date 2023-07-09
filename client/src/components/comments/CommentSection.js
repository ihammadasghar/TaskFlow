import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/taskboards/actions";
import { uiActions } from "../../store/ui/slice";

import { Typography, Box, Paper, IconButton, InputBase, List, ListItem } from "@mui/material";
import { Send, Comment as CommentIcon } from '@mui/icons-material';

import Comment from "./Comment";

const CommentSection = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const message = useSelector((state) => state.ui.commentMessage);
    const handleChange = (event) => dispatch(uiActions.setState({ stateName: "commentMessage", value: event.target.value }));
    const handleSubmit = () => {
        dispatch(addComment(message));
        dispatch(uiActions.setState({ stateName: "commentMessage", value: "" }));
    }

    const comments = useSelector((state) => state.taskBoards.loadedTask.comments);

    return (
        <Box sx={{ my: 1 }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <CommentIcon style={theme.styles.iconOnBackground} />
                <Typography
                    gutterBottom
                    variant="h6"
                    color="onBackground.main"
                    component="div"
                    sx={{ my: 2 }}
                >
                    Comments
                </Typography>
            </div>

            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: "100%",
                    mb: 2,
                    bgcolor: "onBackground.textField",
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, color: "onBackground.main" }}
                    value={message}
                    onChange={handleChange}
                    placeholder="Write a comment..."
                    inputProps={{ 'aria-label': 'Write a comment' }}
                    multiline
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="comment"
                    onClick={handleSubmit}
                >
                    <Send
                        style={{ fill: theme.palette.onBackground.main }}
                    />
                </IconButton>
            </Paper>

            <Box
                sx={{
                    bgcolor: "onBackground.box",
                    borderRadius: "3px"
                }}
            >
                {comments && comments.length !== 0 ?
                    <List>
                        {comments.map((c) => (
                            <ListItem key={`comment${c.createdAt}`}>
                                <Comment comment={c} />
                            </ListItem>
                        ))}
                    </List>
                    :
                    <Typography
                        variant="h6"
                        color="onBackground.main"
                        component="div"
                        sx={{ my: 1, p: 5 }}
                        align="center"
                    >
                        No comments
                    </Typography>
                }
            </Box>
        </Box>
    )
}

export default CommentSection;