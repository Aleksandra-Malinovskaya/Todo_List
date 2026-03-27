import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { check, del, edit } from "./redux/tasksAction";

function Task({ item }) {
  const ref = useRef(null);
  const [ischeck, setIsCheck] = useState(item.isDone);
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
    setIsCheck((ischeck) => !ischeck);
    dispatch(check(item.id));
  }

  function handleEdit() {
    if (newTitle.trim() !== "") {
      dispatch(edit({ id: item.id, newTitle: newTitle }));
      setIsEdit((isEdit) => !isEdit);
    }
  }
  function handleDownKey(e) {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      dispatch(edit({ id: item.id, newTitle: newTitle }));
      setIsEdit(false);
      setNewTitle(item.title);
    }
  }

  return (
    <div className="task" ref={ref}>
      <input
        type="checkbox"
        checked={ischeck}
        onChange={handleCheck}
        className="checkbox"
      />
      {!isEdit ? (
        <p className={item.isDone ? "active" : ""}>{item.title}</p>
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
      <button onClick={() => dispatch(del(item.id))}>❌</button>
    </div>
  );
}
export { Task };
