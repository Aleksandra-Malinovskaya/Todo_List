import AuthSlice from "./AuthSlice";
import inputTextReduser from "./InpitTextSlice";
import tasksReduser from "./TasksSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    text: inputTextReduser,
    tasks: tasksReduser,
    auth: AuthSlice,
  },
});

export default store;
