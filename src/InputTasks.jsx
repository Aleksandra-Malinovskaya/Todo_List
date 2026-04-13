import { useState } from "react";
import { addTask } from "./apiTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function InputTasks() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const add = useMutation({
    mutationFn: (value) => addTask(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  function addTasks() {
    if (value.trim() !== "") {
      add.mutate(value);
      setValue("");
    }
  }
  return (
    <>
      {add.isError ? <p>{add.error}</p> : ""}
      {add.isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="inputTasks">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? addTasks() : "")}
          />
          <button onClick={addTasks}>Добавить</button>
        </div>
      )}
    </>
  );
}

export { InputTasks };
