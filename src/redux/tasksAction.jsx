export const add = (title) => {
  return {
    type: "add",
    payload: title,
  };
};

export const check = (id) => {
  return {
    type: "check",
    payload: id,
  };
};

export const del = (id) => {
  return {
    type: "del",
    payload: id,
  };
};

export const edit = ({ id, newTitle }) => {
  return {
    type: "edit",
    payload: { id, newTitle },
  };
};

export const clearCompleted = () => {
  return {
    type: "clearCompl",
  };
};
