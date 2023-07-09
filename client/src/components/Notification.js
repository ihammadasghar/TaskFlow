import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui/slice";

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      uiActions.setState({
        name: "notification",
        value: null
      })
    );
  };

  return (
    <Alert onClose={handleClose} severity={type}>
      {message}
    </Alert>
  );
};

export default Notification;