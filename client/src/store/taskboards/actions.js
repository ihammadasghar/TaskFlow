import { taskBoardActions } from "./slice";
import { fetchPost } from "../../utils/api";
import store from '..';
import { TASK_INTERVAL } from "../../utils/constants";

const getTaskBoardList = (lastTaskFetchDt, taskboardChanged) => {
  return async (dispatch) => {
    if (((new Date()) - lastTaskFetchDt) > TASK_INTERVAL || taskboardChanged) {
      const state = store.getState();
      const inputData = {
        taskBoard: state.tasks.choosenTaskboardId
      }

      try {
        const response = await fetchPost('/api/taskboards/list', inputData);
        dispatch(taskBoardActions.replaceTaskList(response));
      } catch (err) { console.log("ERROR_FETCHING_TASKS"); }
    }
  };
};

const getTaskBoardDetails = (taskBoardId) => {
  return async (dispatch) => {
    const inputData = {
      _id: taskBoardId
    }

    try {
      const response = await fetchPost('/api/taskboards/details', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
      }
    }
    catch (err) {
      if (process.env.REACT_APP_ENV === "DEV") {
        console.log(err);
      }
    }
  };
};

const addTaskBoard = (name) => {
  return async (dispatch) => {
    const inputData = {
      name
    }
    try {
        const response = await fetchPost('/api/taskboards/add', inputData);
        if (response.success) {
            dispatch(taskBoardActions.setState({ stateName: "allTaskBoards", value: response.data }));
        }
    } catch (err) { console.log("ERROR_ADDING_TASKBOARD"); }

  };
};

const editTaskBoard = (editedTaskBoard) => {
  return async (dispatch) => {
    const inputData = {
      _id: editedTaskBoard.id,
      name: editedTaskBoard.name,
    }

    try {
        const response = await fetchPost('/api/taskboards/edit', inputData);
        if (response.success) {
            dispatch(taskBoardActions.setState({ stateName: "allTaskBoards", value: response.data }));
        }
    } catch (err) { console.log("ERROR_EDITING_TASKBOARD"); }

  };
};

const editTask = (editedTask) => {
  return async (dispatch) => {
    const inputData = {
      _id: editedTask.id,
      taskBoardId: editedTask.taskBoardId,
      header: editedTask.header,
      description: editedTask.description,
      stage: editedTask.stage
    }

    try {
        const response = await fetchPost('/api/tasks/edit', inputData);
        if (response.success) {
            dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
        }
    } catch (err) { console.log("ERROR_EDITING_TASK"); }

  };
};

const addTask = (header, taskStage, description = null) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      header,
      taskStage,
      description,
      taskBoardId: state.taskboards.loadedTaskBoard._id
    }
    try {
        const response = await fetchPost('/api/tasks/add', inputData);
        if (response.success) {
            dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
        }
    } catch (err) { console.log("ERROR_ADDING_TASK"); }

  };
};

const getTaskDetails = (taskId) => {
  return async (dispatch) => {
    const inputData = {
      _id: taskId
    }

    try {
      const response = await fetchPost('/api/tasks/details', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTask", value: response.data }));
      }
    }
    catch (err) {
      if (process.env.REACT_APP_ENV === "DEV") {
        console.log(err);
      }
    }
  };
};

const addComment = (message) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      taskId: state.taskboards.loadedTask._id,
      message
    }

    try {
      const response = await fetchPost('/api/comments/add', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTask", value: response.data }));
      }
    }
    catch (err) {
      if (process.env.REACT_APP_ENV === "DEV") {
        console.log(err);
      }
    }
  };
};

const editComment = (editedComment) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      _id: editedComment.id,
      message: editedComment.message,
      taskId: state.taskboards.loadedTask._id
    }

    try {
        const response = await fetchPost('/api/taskboards/edit', inputData);
        if (response.success) {
            dispatch(taskBoardActions.setState({ stateName: "allTaskBoards", value: response.data }));
        }
    } catch (err) { console.log("ERROR_EDITING_TASKBOARD"); }

  };
};

export { 
  getTaskBoardList,  
  getTaskBoardDetails,
  addTaskBoard, 
  editTaskBoard, 
  addTask,
  getTaskDetails,
  editTask,
  editComment,
  addComment
 };