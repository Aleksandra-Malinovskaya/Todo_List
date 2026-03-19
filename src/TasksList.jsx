import { Task } from "./Task";

function TasksList({ tasks, isChecked, deleteTask, editTask }) {
  return (
    <>
      {tasks.map((item) => (
        <Task
          key={item.id}
          item={item}
          isChecked={isChecked}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </>
  );
}

export { TasksList };
