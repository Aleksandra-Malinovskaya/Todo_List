import { useEffect, useRef, useState } from "react";

function Task({ item, isChecked, deleteTask, editTask, loadingTask }) {
  const ref = useRef(null);
  const [ischeck, setIsCheck] = useState(item.isCompleted);
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

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
    setIsCheck((ischeck) => !ischeck);
    isChecked(item.id);
  }

  function handleEdit() {
    if (newTitle.trim() !== "") {
      editTask(item.id, newTitle);
      setIsEdit((isEdit) => !isEdit);
    }
  }
  function handleDownKey(e) {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      editTask(item.id, item.title);
      setIsEdit(false);
      setNewTitle(item.title);
    }
  }

  return (
    <div className="task" ref={ref}>
      {!loadingTask ? (
        <>
          <input
            type="checkbox"
            checked={ischeck}
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
          <button onClick={() => deleteTask(item.id)}>❌</button>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
export { Task };
