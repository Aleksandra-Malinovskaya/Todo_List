import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, zero } from "./RTK/InpitTextSlice";
import { addTask } from "./RTK/TasksSlice";

function InputTasks() {
  const { value } = useSelector((store) => store.text);
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);

  function addTasks() {
    if (value.trim() !== "") {
      dispatch(addTask({ title: value }));
      dispatch(zero());
      setWarning(false);
    } else {
      setWarning(true);
    }
  }
  return (
    <div className="inputTasks">
      <input
        value={value}
        onChange={(e) => dispatch(change(e.target.value))}
        onKeyDown={(e) => (e.key === "Enter" ? addTasks() : "")}
      />
      <button onClick={addTask}>Добавить</button>
      {warning && <p>Нельзя добавить пустую строку</p>}
    </div>
  );
}

export { InputTasks };
