import { Task } from "./Task";

function TasksList({ tasks, isChecked, deleteTask, editTask, loadingTask }) {
  return (
    <>
      {tasks.map((item) => (
        <Task
          key={item.id}
          item={item}
          isChecked={isChecked}
          deleteTask={deleteTask}
          editTask={editTask}
          loadingTask={loadingTask === item.id}
        />
      ))}
    </>
  );
}

export { TasksList };
