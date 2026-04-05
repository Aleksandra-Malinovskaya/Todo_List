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
        error.response?.data?.message || error.response.data.errors[0].msg
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
    builder.addCase(regRequest.fulfilled, (state) => {
      navigate("/auth");
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.success = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.error = action.payload || action.error.message;
          state.success = false;
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
