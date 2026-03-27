import { useSelector } from "react-redux";
import { Task } from "./Task";

function TasksList({ tasks }) {
  return (
    <>
      {tasks.map((item) => (
        <Task key={item.id} item={item} />
      ))}
    </>
  );
}

export { TasksList };
