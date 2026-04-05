import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../api";

export const regRequest = createAsyncThunk(
  "reg/regRequest",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("users/register", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.response.data.errors[0].msg
      );
    }
  }
);
export const authRequest = createAsyncThunk(
  "reg/authRequest",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("auth/login", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.response.data.errors[0].msg
      );
    }
  }
);
const initialState = {
  success: false,
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(regRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(authRequest.fulfilled, (state, action) => {
        const { token } = action.payload;
        localStorage.setItem("token", token);
        state.loading = false;
        state.error = null;
        state.success = true;
      });
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || action.error.message;
          state.success = false;
          state.loading = false;
        }
      );
  },
  selectors: {
    selectError: (state) => state.error,
    selectLoading: (state) => state.loading,
    selectSuccess: (state) => state.success,
  },
});

export const { selectError, selectLoading, selectSuccess } =
  AuthSlice.selectors;
export default AuthSlice.reducer;
