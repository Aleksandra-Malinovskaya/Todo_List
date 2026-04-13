import { useEffect, useState } from "react";
import "./App.css";
import { InputTasks } from "./InputTasks";
import { TasksList } from "./TasksList";
import { useNavigate } from "react-router";
import { deleteTask, getTasks } from "./apiTasks";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  const [filtered, setFiltered] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, []);
  const { data: tasks, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const clearCompleted = useMutation({
    mutationFn: async () => {
      const deleteCompleted = tasks.filter((item) => item.isCompleted);
      const deletePromise = deleteCompleted.map((item) => deleteTask(item.id));
      return await Promise.all(deletePromise);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const filteredTasks = tasks
    ? tasks.filter((item) => {
        if (filtered === "active") return !item.isCompleted;
        if (filtered === "completed") return item.isCompleted;
        return true;
      })
    : [];
  const exitAccount = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <>
      <div className="main">
        {isPending ? (
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
                Осталось дел:{" "}
                {tasks ? tasks.filter((item) => !item.isCompleted).length : 0}
              </p>
              <button onClick={() => clearCompleted.mutate()}>
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
