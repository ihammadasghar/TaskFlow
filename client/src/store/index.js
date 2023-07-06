import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui/slice';
import taskBoardsSlice from './taskboards/slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    taskBoards: taskBoardsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
export default store;