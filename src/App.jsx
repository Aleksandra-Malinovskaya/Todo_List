import { useEffect, useState } from "react";
import "./App.css";
import { InputTasks } from "./InputTasks";
import { TasksList } from "./TasksList";
import { useDispatch, useSelector } from "react-redux";
import { selectValue, selectLoading } from "./RTK/TasksSlice";
import { useNavigate } from "react-router";
import { getTasks, clearCompleted } from "./RTK/TasksSlice";

function App() {
  const tasks = useSelector(selectValue);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [filtered, setFiltered] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    } else {
      dispatch(getTasks());
    }
  }, []);

  const filteredTasks = tasks.filter((item) => {
    if (filtered === "active") return !item.isCompleted;
    if (filtered === "completed") return item.isCompleted;
    return true;
  });
  const exitAccount = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <>
      <div className="main">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>Мой To-Do List</h1>
            <InputTasks />
            <TasksList tasks={filteredTasks} />
            <div className="filtered">
              <button onClick={() => setFiltered("all")}>Все</button>
              <button onClick={() => setFiltered("active")}>Активные</button>
              <button onClick={() => setFiltered("completed")}>
                Завершённые
              </button>
            </div>
            <div>
              <p>
                Осталось дел: {tasks.filter((item) => !item.isCompleted).length}
              </p>
              <button onClick={() => dispatch(clearCompleted())}>
                Очистить выполненные
              </button>
            </div>
          </>
        )}
      </div>
      <button onClick={exitAccount} className="exit">
        Выход
      </button>
    </>
  );
}

export default App;
