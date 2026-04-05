import authSlice from "./AuthSlice";
import inputTextReduser from "./InpitTextSlice";
import tasksReduser from "./TasksSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    text: inputTextReduser,
    tasks: tasksReduser,
    auth: authSlice,
  },
});

export default store;
