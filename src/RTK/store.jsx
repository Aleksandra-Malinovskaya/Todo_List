import { combineReducers } from "redux";
import inputTextReduser from "./InpitTextSlice";
import tasksReduser from "./TasksSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: combineReducers({
    text: inputTextReduser,
    tasks: tasksReduser,
  }),
});

export default store;
