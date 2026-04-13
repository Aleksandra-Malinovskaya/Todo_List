import { useEffect, useRef, useState } from "react";
import { isChecked, deleteTask, editTask } from "./apiTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Task({ item }) {
  const queryClient = useQueryClient();
  const check = useMutation({
    mutationFn: () => isChecked(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const deleteTasks = useMutation({
    mutationFn: () => deleteTask(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const edit = useMutation({
    mutationFn: () => editTask(item.id, newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const ref = useRef(null);
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
    check.mutate(item.id);
  }

  function handleEdit() {
    if (newTitle.trim() !== "") {
      edit.mutate(item.id, newTitle);
      setIsEdit((isEdit) => !isEdit);
    }
  }
  function handleDownKey(e) {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      edit.mutate(item.id, newTitle);
      setIsEdit(false);
      setNewTitle(item.title);
    }
  }

  return (
    <>
      {check.isPending || deleteTasks.isPending || edit.isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="task" ref={ref}>
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => check.mutate(item.id)}
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
          <button onClick={() => deleteTasks.mutate(item.id)}>❌</button>
        </div>
      )}
    </>
  );
}
export { Task };
