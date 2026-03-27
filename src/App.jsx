import { useEffect, useState } from "react";
import "./App.css";
import { InputTasks } from "./InputTasks";
import { TasksList } from "./TasksList";
import { clearCompleted } from "./redux/tasksAction";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState("all");

  const filteredTasks = tasks.filter((item) => {
    if (filtered === "active") return !item.isDone;
    if (filtered === "completed") return item.isDone;
    return true;
  });

  return (
    <div className="main">
      <h1>Мой To-Do List</h1>
      <InputTasks />
      <TasksList tasks={filteredTasks} />
      <div className="filtered">
        <button onClick={() => setFiltered("all")}>Все</button>
        <button onClick={() => setFiltered("active")}>Активные</button>
        <button onClick={() => setFiltered("completed")}>Завершённые</button>
      </div>
      <div>
        <p>Осталось дел: {tasks.filter((item) => !item.isDone).length}</p>
        <button onClick={() => dispatch(clearCompleted())}>
          Очистить выполненные
        </button>
      </div>
    </div>
  );
}

export default App;
