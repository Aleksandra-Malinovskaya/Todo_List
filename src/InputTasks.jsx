import { useState } from "react";

function InputTasks({ setTasks }) {
  const [task, setTask] = useState("");
  const [warning, setWarning] = useState(false);

  function addTask() {
    if (task.trim() !== "") {
      setTasks((tasks) => [
        ...tasks,
        { id: crypto.randomUUID(), title: task, isDone: false },
      ]);
      setTask("");
      setWarning(false);
    } else {
      setWarning(true);
    }
  }
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
