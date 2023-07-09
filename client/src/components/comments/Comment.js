import { Card, CardContent, CardActionArea, Typography, Box } from "@mui/material";

const Comment = ({ comment }) => {
    const { message, createdAt } = comment;
    return (
        <Box
            sx={{ width: "100%" }}
        >
            <div>
                <Typography
                    color="onBackground.main"
                    component="h5"
                    sx={{
                        display: "inline-block",
                        mr: 1
                    }}
                >
                    Person
                </Typography>
                <Typography
                    color="onBackground.dim"
                    component="p"
                    variant="subtitle2"
                    sx={{ display: "inline-block" }}
                >
                    {createdAt}
                </Typography>
            </div>
            <Card
                sx={{
                    width: 100 + "%",
                    bgcolor: "background.lighter"
                }}
            >
                <CardActionArea>
                    <CardContent>
                        <Typography
                            color="onBackground.main"
                            component="p"
                            variant="subtitle2"
                            sx={{
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {message}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    )
}

export default Comment;