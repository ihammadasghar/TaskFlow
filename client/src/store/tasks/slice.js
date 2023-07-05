import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: [],
    loadedTaskboardId: null,
    choosenTaskboardId: null,
    detailViewTaskId: null,
    taskComments: [],
    lastTaskFetchDt: null
  },
  reducers: {
    toggle(state, action) {
      state[action.payload] = !state[action.payload];
    },
    setState(state, action) {
      state[action.payload.stateName] = action.payload.value;
    },
    replaceTaskList(state, action) {
      state.allTasks = action.payload.data;
      state.lastTaskFetchDt = new Date();

      state.loadedTaskboardId = state.choosenTaskboardId;
      console.log("Last Task Fetch:", state.lastTaskFetchDt);
    }
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;