import { taskBoardActions } from "./slice";
import { fetchGet, fetchPost } from "../../utils/api";
import store from '..';

const getTaskBoardList = () => {
  return async (dispatch) => {
    try {
      dispatch(taskBoardActions.setState({stateName: "allTaskBoards", value: []}))
      const response = await fetchGet('/api/taskboards/list');
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "allTaskBoards", value: response.data }));
        console.log("FETCHED_TASKSBOARDS");
      }
    } catch (err) { console.log("ERROR_FETCHING_TASKBOARDS"); }
  }
};

const getTaskBoardDetails = (taskBoardId) => {
  return async (dispatch) => {
    const inputData = {
      _id: taskBoardId
    }

    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTaskBoard", value: null}))
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

const addTaskBoard = (taskBoard) => {
  return async (dispatch) => {
    const inputData = {
      name: taskBoard.name
    }
    try {
      dispatch(taskBoardActions.setState({stateName: "allTaskBoards", value: []}))
      const response = await fetchPost('/api/taskboards/add', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "allTaskBoards", value: response.data }));
      }
    } catch (err) { console.log("ERROR_ADDING_TASKBOARD"); }

  };
};

const removeTaskBoard = (id) => {
  return async (dispatch) => {
    const inputData = {
      _id: id,
    }
    try {
      dispatch(taskBoardActions.setState({stateName: "allTaskBoards", value: []}))
      const response = await fetchPost('/api/taskboards/remove', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "allTaskBoards", value: response.data }));
        console.log("DELETED_TASKBOARD");
      }
    } catch (err) { console.log("ERROR_DELETING_TASKBOARD"); }
  }
};

const editTaskBoard = (editedTaskBoard) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      _id: editedTaskBoard._id,
    }
    if (editedTaskBoard.name) inputData['name'] = editedTaskBoard.name;

    try {
      dispatch(taskBoardActions.setState({stateName: "allTaskBoards", value: []}))
      const response = await fetchPost('/api/taskboards/edit', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "allTaskBoards", value: response.data }));
        if (state.taskBoards.loadedTaskBoard?._id === editedTaskBoard._id) {
          dispatch(getTaskBoardDetails(editedTaskBoard._id));
        }
      }
    } catch (err) { console.log("ERROR_EDITING_TASKBOARD"); }

  };
};

const editTask = (editedTask, refreshTaskBoard = true) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      _id: editedTask._id,
      taskBoardId: state.taskBoards.loadedTaskBoard._id
    }
    if (editedTask.header) inputData['header'] = editedTask.header
    if (editedTask.description) inputData['description'] = editedTask.description
    if (editedTask.stageId) inputData['stageId'] = editedTask.stageId

    try {
      if(refreshTaskBoard)  dispatch(taskBoardActions.setState({stateName: "loadedTaskBoard", value: null}))
      const response = await fetchPost('/api/tasks/edit', inputData);
      console.log(response);
      if (response.success && refreshTaskBoard) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
        if (editedTask._id === state.taskBoards.loadedTask._id) {
          dispatch(getTaskDetails(state.taskBoards.loadedTask._id))
        }
      }
    } catch (err) { console.log("ERROR_EDITING_TASK"); console.log(err); }

  };
};

const addTask = (newTask) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      header: newTask.header,
      stageId: newTask.stageId,
      taskBoardId: state.taskBoards.loadedTaskBoard._id
    }
    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTaskBoard", value: null}))
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
      dispatch(taskBoardActions.setState({stateName: "loadedTask", value: null}))
      const response = await fetchPost('/api/tasks/details', inputData);
      if (response.success) {
        console.log(response)
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
      taskId: state.taskBoards.loadedTask._id,
      message
    }

    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTask", value: null}))
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
      taskId: state.taskBoards.loadedTask._id
    }

    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTask", value: null}))
      const response = await fetchPost('/api/taskboards/edit', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTask", value: response.data }));
      }
    } catch (err) { console.log("ERROR_EDITING_TASKBOARD"); }

  };
};

const addTaskBoardStage = (taskStage) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      name: taskStage.name,
      position: state.taskBoards.loadedTaskBoard.stages.length,
      taskBoardId: state.taskBoards.loadedTaskBoard._id
    }
    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTaskBoard", value: null}))
      const response = await fetchPost('/api/taskboards/add-task-stage', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
      }
    } catch (err) { console.log("ERROR_ADDING_TASKBOARD_STAGE"); }

  };
};

const editTaskBoardStage = (taskStage) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      _id: taskStage._id,
      taskBoardId: state.taskBoards.loadedTaskBoard._id
    }
    if (taskStage.name) inputData['name'] = taskStage.name
    if (taskStage.position) inputData['position'] = taskStage.position
    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTaskBoard", value: null}))
      const response = await fetchPost('/api/taskboards/edit-task-stage', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
      }
    } catch (err) { console.log("ERROR_EDITING_TASKBOARD_STAGE"); }

  };
};

const removeTaskBoardStage = (id) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      _id: id,
      taskBoardId: state.taskBoards.loadedTaskBoard._id
    }
    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTaskBoard", value: null}))
      const response = await fetchPost('/api/taskboards/remove-task-stage', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
      }
    } catch (err) { console.log("ERROR_DELETING_TASKBOARD_STAGE"); }

  };
};

const removeTask = (id) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      _id: id,
      taskBoardId: state.taskBoards.loadedTaskBoard._id
    }
    try {
      dispatch(taskBoardActions.setState({stateName: "loadedTaskBoard", value: null}))
      const response = await fetchPost('/api/tasks/remove', inputData);
      if (response.success) {
        dispatch(taskBoardActions.setState({ stateName: "loadedTaskBoard", value: response.data }));
      }
    } catch (err) { console.log("ERROR_DELETING_TASK"); }

  };
};

export {
  getTaskBoardList,
  getTaskBoardDetails,
  addTaskBoard,
  removeTaskBoard,
  editTaskBoard,
  addTask,
  getTaskDetails,
  editTask,
  removeTask,
  editComment,
  addComment,
  addTaskBoardStage,
  removeTaskBoardStage,
  editTaskBoardStage
};