import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  notification: null,
  taskboardMenuAnchorEl: null,
  userMenuAnchorEl: null,
  editTaskView: false,
  attendanceSignsForm: {},
  loginForm: { username: "", password: "", rememberMe: false },
  editTaskForm: { header: "", description: "" },
  newCommentMsg: "",
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    ...INITIAL_STATE,
    navbarToggle: false,
    themeColors: {
      primary: '#0e2b68',
      secondary: '#fff',
      background: '#902c54',
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
      state[action.payload.name] = action.payload.value;
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