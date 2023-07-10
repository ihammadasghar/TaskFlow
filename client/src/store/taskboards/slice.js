import { createSlice } from "@reduxjs/toolkit";

const taskBoardsSlice = createSlice({
  name: "taskBoards",
  initialState: {
    allTaskBoards: [],
    loadedTaskBoard: null,
    loadedTask: null,
    lastTaskFetchDt: null,
    taskDetailsModalToggle: false
  },
  reducers: {
    toggle(state, action) {
      state[action.payload] = !state[action.payload];
    },
    setState(state, action) {
      state[action.payload.stateName] = action.payload.value;
    },
    removeTaskFromStage(state, action){

    },
    moveTask(state, action){
      let taskId = action.payload.taskId
      let stagePos = action.payload.stagePosition
      let updateBy = action.payload.updateBy

      let indexOfTask;
      for(let i = 0; i < state.loadedTaskBoard.stages[stagePos].tasks.length; i++){
        if(state.loadedTaskBoard.stages[stagePos].tasks[i]._id === taskId) {
          indexOfTask = i
          console.log("Task Found")
          console.log(indexOfTask)
        }
      }
      const task = state.loadedTaskBoard.stages[stagePos].tasks.splice(indexOfTask, 1)[0];
      task.stageId = state.loadedTaskBoard.stages[stagePos + updateBy]
      state.loadedTaskBoard.stages[stagePos + updateBy].tasks.push(task)

    }
  },
});

export const taskBoardActions = taskBoardsSlice.actions;

export default taskBoardsSlice;