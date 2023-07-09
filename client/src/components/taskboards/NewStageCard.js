import { useDispatch, useSelector } from "react-redux";
import { uiActions } from '../../store/ui/slice';
import { addTaskBoardStage } from "../../store/taskboards/actions";

import { Card, CardContent } from "@mui/material";
import NewField from "../utility/NewField";

const NewStageCard = () => {
    const dispatch = useDispatch();
    const stageForm = useSelector((state) => state.ui.stageForm);
    const handleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "stageForm", field: field, value: value }));
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addTaskBoardStage(stageForm));
        dispatch(uiActions.setFormValue({ form: "stageForm", field: 'name', value: "" }));
    }
    return (
        <Card
            key={`newTaskStage`}
            sx={{
                bgcolor: "background.main",
                borderRadius: "3px",
                mr: 2,
                height: "80vh",
                minWidth: { xs: "80%", md: "23%" }
            }}
        >
            <CardContent sx={{ p: 0 }}>
                <NewField
                    placeholder="Type a name"
                    name={"name"}
                    value={stageForm["name"]}
                    handleChangeFunc={handleChange}
                    submitFunc={handleSubmit}
                />
            </CardContent>
        </Card>

    )
}

export default NewStageCard;