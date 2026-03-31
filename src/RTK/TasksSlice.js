import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isDone: false,
      });
    },
    check: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
    del: (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    edit: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task) {
        task.title = action.payload.newTitle;
      }
    },
    clearCompl: (state) => {
      state.tasks = state.tasks.filter((item) => item.isDone !== true);
    },
  },
});

export const { add, check, del, edit, clearCompl } = TasksSlice.actions;
export default TasksSlice.reducer;
