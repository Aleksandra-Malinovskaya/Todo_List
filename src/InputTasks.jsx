import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, zero } from "./redux/inputAction";
import { add } from "./redux/tasksAction";

function InputTasks() {
  const { text } = useSelector((store) => store.text);
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);

  function addTask() {
    if (text.trim() !== "") {
      dispatch(add(text));
      dispatch(zero());
      setWarning(false);
    } else {
      setWarning(true);
    }
  }
  return (
    <div className="inputTasks">
      <input
        value={text}
        onChange={(e) => dispatch(change(e.target.value))}
        onKeyDown={(e) => (e.key === "Enter" ? addTask() : "")}
      />
      <button onClick={addTask}>Добавить</button>
      {warning && <p>Нельзя добавить пустую строку</p>}
    </div>
  );
}

export { InputTasks };
