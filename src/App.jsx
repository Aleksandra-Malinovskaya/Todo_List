import { useEffect, useState } from "react";
import "./App.css";
import { InputTasks } from "./InputTasks";
import { TasksList } from "./TasksList";
import api from "./api";
import { useNavigate } from "react-router";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTask, setLoadingTask] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const response = await api.get("todos");
      setTasks(response.data);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isChecked = async (id) => {
    try {
      setLoadingTask(id);
      const response = await api.patch(`todos/${id}/isCompleted`);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      getAllTasks();
      setLoadingTask(null);
    }
  };
  const deleteTask = async (id) => {
    try {
      setLoadingTask(id);
      const response = await api.delete(`todos/${id}`);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      getAllTasks();
      setLoadingTask(null);
    }
  };

  const editTask = async (id, newTitle) => {
    try {
      setLoadingTask(id);
      const response = await api.patch(`todos/${id}`, { title: newTitle });
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      getAllTasks();
      setLoadingTask(null);
    }
  };

  const clearCompleted = async () => {
    try {
      const deleteCompleted = tasks.filter((item) => item.isCompleted);
      const deletePromise = deleteCompleted.map((item) =>
        api.delete(`todos/${item.id}`)
      );
      await Promise.all(deletePromise);
    } catch (error) {
      console.log(error);
    } finally {
      getAllTasks();
    }
  };

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
        <h1>Мой To-Do List</h1>
        {!isLoading ? (
          <>
            <InputTasks getAllTasks={getAllTasks} />
            <TasksList
              tasks={filteredTasks}
              isChecked={isChecked}
              deleteTask={deleteTask}
              editTask={editTask}
              loadingTask={loadingTask}
            />
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
              <button onClick={clearCompleted}>Очистить выполненные</button>
            </div>
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
      <button onClick={exitAccount} className="exit">
        Выход
      </button>
    </>
  );
}

export default App;
