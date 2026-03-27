const initialValue = {
  text: "",
};

const inputTextReduser = (state = initialValue, action) => {
  switch (action.type) {
    case "change":
      return { ...state, text: action.payload };
    case "zero":
      return { ...state, text: "" };
    default:
      return state;
  }
};

export { inputTextReduser };
