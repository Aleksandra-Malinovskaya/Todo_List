import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../api";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("todos");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (title, thunkAPI) => {
    try {
      const response = await api.post("todos", title);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const isChecked = createAsyncThunk(
  "tasks/isCheck",
  async (id, thunkAPI) => {
    try {
      const response = await api.patch(`todos/${id}/isCompleted`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`todos/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, newTitle }, thunkAPI) => {
    try {
      const response = await api.patch(`todos/${id}`, { title: newTitle });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const clearCompleted = createAsyncThunk(
  "tasks/clearCompleted",
  async (_, thunkAPI) => {
    try {
      const deleteCompleted = thunkAPI
        .getState()
        .tasks.tasks.filter((item) => item.isCompleted);
      const deletePromise = deleteCompleted.map((item) =>
        api.delete(`todos/${item.id}`)
      );
      await Promise.all(deletePromise);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(isChecked.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload[0].id
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(clearCompleted.fulfilled, (state) => {
        state.tasks = state.tasks.filter((item) => item.isCompleted !== true);
        state.loading = false;
        state.error = null;
      });
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.error = action.payload || action.error.message;
        }
      );
  },
  selectors: {
    selectValue: (state) => state.tasks,
    selectLoading: (state) => state.loading,
  },
});

export const { selectValue, selectLoading } = TasksSlice.selectors;
export default TasksSlice.reducer;
