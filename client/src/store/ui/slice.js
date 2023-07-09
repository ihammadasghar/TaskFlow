import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isDarkTheme: false,
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
      secondary: '#F1F6F9',
      primary: '#009FBD',
      highlight: '#212A3E',
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
    switchTheme(state, action) {
      let darkColors = {
        secondary: '#001C30',
        primary: '#176B87',
        highlight: '#64CCC5',
        onBackground: '#fff',
      }

      let lightColors = {
        secondary: '#F1F6F9',
        primary: '#009FBD',
        highlight: '#212A3E',
        onBackground: '#fff',
      }

      if (state.isDarkTheme) {
        state.themeColors = lightColors
        state.isDarkTheme = false
      }
      else {
        state.themeColors = darkColors
        state.isDarkTheme = true
      }

    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;