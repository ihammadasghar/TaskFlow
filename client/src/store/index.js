import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './ui/slice';
import taskSlice from './tasks/slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    tasks: taskSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
export default store;