import { useState } from "react";
import api from "./api";

function InputTasks({ setTasks }) {
  const [task, setTask] = useState("");
  const [warning, setWarning] = useState(false);

  const addTask = async () => {
    if (task.trim() !== "") {
      try {
        const response = await api.post("todos", { title: task });
        console.log(response.data);
        setTask("");
        setWarning(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      setWarning(true);
    }
  };
  return (
    <div className="inputTasks">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? addTask() : "")}
      />
      <button onClick={addTask}>Добавить</button>
      {warning && <p>Нельзя добавить пустую строку</p>}
    </div>
  );
}

export { InputTasks };
