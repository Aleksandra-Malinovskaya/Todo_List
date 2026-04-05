import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { isChecked, deleteTask, editTask } from "./RTK/TasksSlice";

function Task({ item }) {
  const ref = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEdit) return;
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleEdit();
        setNewTitle(item.title);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit]);

  function handleCheck() {
    dispatch(isChecked(item.id));
  }

  function handleEdit() {
    if (newTitle.trim() !== "") {
      dispatch(editTask({ id: item.id, newTitle: newTitle }));
      setIsEdit((isEdit) => !isEdit);
    }
  }
  function handleDownKey(e) {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      dispatch(editTask({ id: item.id, newTitle: newTitle }));
      setIsEdit(false);
      setNewTitle(item.title);
    }
  }

  return (
    <div className="task" ref={ref}>
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={handleCheck}
        className="checkbox"
      />
      {!isEdit ? (
        <p className={item.isCompleted ? "active" : ""}>{item.title}</p>
      ) : (
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => handleDownKey(e)}
        ></input>
      )}
      {!isEdit ? (
        <button onClick={() => setIsEdit((isEdit) => !isEdit)}>✍️</button>
      ) : (
        <button onClick={handleEdit}>Сохранить</button>
      )}
      <button onClick={() => dispatch(deleteTask(item.id))}>❌</button>
    </div>
  );
}
export { Task };
