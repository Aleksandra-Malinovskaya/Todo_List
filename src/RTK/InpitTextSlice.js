import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const InputTextSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
    zero: (state) => {
      state.value = "";
    },
  },
});

export const { change, zero } = InputTextSlice.actions;
export default InputTextSlice.reducer;
