import api from "./api";

export const getTasks = () => {
  return api.get("todos").then((res) => res.data);
};
export const addTask = (task) => {
  return api.post("todos", { title: task });
};
export const isChecked = (id) => {
  return api.patch(`todos/${id}/isCompleted`);
};
export const deleteTask = (id) => {
  return api.delete(`todos/${id}`);
};
export const editTask = (id, newTitle) => {
  return api.patch(`todos/${id}`, { title: newTitle });
};