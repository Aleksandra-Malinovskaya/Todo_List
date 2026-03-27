import { legacy_createStore as createStore, combineReducers } from "redux";
import { inputTextReduser } from "./inputTextReduser";
import { composeWithDevTools } from "redux-devtools-extension";
import { tasksReduser } from "./tasksReduser";

const store = createStore(
  combineReducers({
    text: inputTextReduser,
    tasks: tasksReduser,
  }),
  composeWithDevTools()
);

export default store;
