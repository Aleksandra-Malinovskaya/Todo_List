import { useEffect, useState } from "react";
import "./App.css";
import { InputTasks } from "./InputTasks";
import { TasksList } from "./TasksList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedData = localStorage.getItem("tasks");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [filtered, setFiltered] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function isChecked(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }
  function deleteTask(id) {
    setTasks((tasks) => tasks.filter((item) => item.id !== id));
  }

  function editTask(id, newTitle) {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  }

  function clearCompleted() {
    setTasks((tasks) => tasks.filter((item) => !item.isDone));
  }

  const filteredTasks = tasks.filter((item) => {
    if (filtered === "active") return !item.isDone;
    if (filtered === "completed") return item.isDone;
    return true;
  });

  return (
    <>
      <h1>Мой To-Do List</h1>
      <InputTasks setTasks={setTasks} />
      <TasksList
        tasks={filteredTasks}
        isChecked={isChecked}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <div className="filtered">
        <button onClick={() => setFiltered("all")}>Все</button>
        <button onClick={() => setFiltered("active")}>Активные</button>
        <button onClick={() => setFiltered("completed")}>Завершённые</button>
      </div>
      <div>
        <p>Осталось дел: {tasks.filter((item) => !item.isDone).length}</p>
        <button onClick={clearCompleted}>Очистить выполненные</button>
      </div>
    </>
  );
}

export default App;
