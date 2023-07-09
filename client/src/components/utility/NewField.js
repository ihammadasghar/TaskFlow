import { useTheme } from "@emotion/react";
import { Paper, InputBase, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const NewField = ({ placeholder, name, value, handleChangeFunc, submitFunc }) => {
    const theme = useTheme();
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                bgcolor: "onBackground.textField",
            }}
            onSubmit={submitFunc}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    color: "onBackground.main",
                }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChangeFunc(name, e.target.value)}
                onBlur={submitFunc}
                inputProps={{ 'aria-label': placeholder }}
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
    )
}

export default NewField;