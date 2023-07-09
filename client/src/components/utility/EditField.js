import { Paper, InputBase } from "@mui/material";

const EditField = ({ name, value, handleChangeFunc, submitFunc }) => {
    return (
        <Paper
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                bgcolor: "onBackground.textField"
            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    color: "onBackground.main",
                }}
                placeholder={name}
                value={value}
                onChange={(e) => handleChangeFunc(name, e.target.value)}
                onBlur={submitFunc}
                inputProps={{ 'aria-label': name }}
            />
        </Paper>

    )
}

export default EditField;