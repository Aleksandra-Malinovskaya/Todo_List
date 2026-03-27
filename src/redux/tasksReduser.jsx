const initialValue = {
  tasks: [],
};

const tasksReduser = (state = initialValue, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: crypto.randomUUID(), title: action.payload, isDone: false },
        ],
      };
    case "check":
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.id === action.payload
              ? { ...task, isDone: !task.isDone }
              : task
          ),
        ],
      };
    case "del":
      return {
        ...state,
        tasks: [...state.tasks.filter((item) => item.id !== action.payload)],
      };
    case "edit":
      return {
        ...state,
        tasks: [
          ...state.tasks.map((item) =>
            item.id === action.payload.id
              ? { ...item, title: action.payload.newTitle }
              : item
          ),
        ],
      };
    case "clearCompl":
      return {
        ...state,
        tasks: [...state.tasks.filter((item) => item.isDone !== true)],
      };
    default:
      return state;
  }
};

export { tasksReduser };
