import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  notification: null,
  taskboardMenuAnchorEl: null,
  userMenuAnchorEl: null,
  isEditingTaskBoard: false,
  isEditingTaskStage: false,
  isEditingTaskHeader: false,
  isEditingTaskDescription: false,
  attendanceSignsForm: {},
  loginForm: { username: "", password: "", rememberMe: false },
  editTaskForm: { header: "", description: "" },
  taskForm: {},
  stageForm: { name: "" },
  taskBoardForm: { name: "" },
  editTaskBoardForm: { _id: "", name: "" },
  editTaskStageForm: { name: "" },
  commentMessage: "",
  taskDetailsModalToggle: false
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    ...INITIAL_STATE,
    navbarToggle: false,
    themeColors: {
      primary: '#001C30',
      secondary: '#fff',
      backgroundDark: '#001C30',
      backgroundLight: '#176B87',
      backgroundLighter: '#64CCC5',
      onBackground: '#fff',
    },
  },
  reducers: {
    setInitialState(state, action) {
      if (Object.hasOwn(action.payload, "primary")) {
        let themeColors = {
          primary: action.payload.primary,
          secondary: action.payload.secondary,
          background: action.payload.background,
          onBackground: action.payload.onbackground,
        };
        state.themeColors = themeColors;
      }
    },
    setState(state, action) {
      state[action.payload.stateName] = action.payload.value;
    },
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        open: action.payload.open,
      };
    },
    toggle(state, action) {
      state[action.payload] = !state[action.payload];
    },
    setFormValue(state, action) {
      state[action.payload.form][action.payload.field] = action.payload.value;
    },
    resetState(state, action) {
      for (const [key, value] of Object.entries(INITIAL_STATE)) {
        state[key] = value;
      }
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;