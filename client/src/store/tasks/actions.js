import { taskActions } from "./slice";
import { fetchPost } from "../../utils/api";
import store from '../../store';
import { TASK_INTERVAL } from "../../utils/constants";

const getTaskList = (lastTaskFetchDt, taskboardChanged) => {
  return async (dispatch) => {
    if (((new Date()) - lastTaskFetchDt) > TASK_INTERVAL || taskboardChanged) {
      const state = store.getState();
      const inputData = {
        taskBoard: state.tasks.choosenTaskboardId
      }

      try {
        const response = await fetchPost('/api/taskboard/tasks', inputData);
        dispatch(taskActions.replaceTaskList(response));
      } catch (err) { console.log("ERROR_FETCHING_TASKS"); }
    }
  };
};

const editTask = (editedTask, returnList = true) => {
  return async (dispatch) => {
    const inputData = {
      taskId: editedTask.id,
      taskBoard: editedTask.taskBoard,
      header: editedTask.header,
      description: editedTask.description,
      taskStage: editedTask.taskStage,
      returnList
    }

    try {
        const response = await fetchPost('/api/tasks', inputData);
        if (response.success) {
            dispatch(taskActions.setState({ stateName: "taskComments", value: response.data }));
        }
    } catch (err) { console.log("ERROR_EDITING_TASK"); }

  };
};

const addTask = (header, taskStage, description = null, returnList = true) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      header,
      taskStage,
      description,
      taskBoard: state.tasks.choosenTaskboardId,
      returnList
    }
    try {
        const response = await fetchPost('/api/tasks', inputData);
        if (response.success) {
            dispatch(taskActions.setState({ stateName: "taskComments", value: response.data }));
        }
    } catch (err) { console.log("ERROR_ADDING_TASK"); }

  };
};

const getTaskComments = () => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      taskId: state.tasks.detailViewTaskId
    }

    try {
      const response = await fetchPost('/api/tasks/comments', inputData);
      if (response.success) {
        dispatch(taskActions.setState({ stateName: "taskComments", value: response.data }));
      }
    }
    catch (err) {
      if (process.env.REACT_APP_ENV === "DEV") {
        console.log(err);
      }
    }
  };
};

const addTaskComment = (message) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      taskId: state.tasks.detailViewTaskId,
      message
    }

    try {
      const response = await fetchPost('/api/comments', inputData);
      if (response.success) {
        dispatch(taskActions.setState({ stateName: "taskComments", value: response.data }));
      }
    }
    catch (err) {
      if (process.env.REACT_APP_ENV === "DEV") {
        console.log(err);
      }
    }
  };
};

export { getTaskList, editTask, addTask, getTaskComments, addTaskComment };