export const change = (value) => {
  return {
    type: "change",
    payload: value,
  };
};
export const zero = () => {
  return {
    type: "zero",
  };
};
