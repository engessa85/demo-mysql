import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface changeNameState {
  name: string;
}

const initialState: changeNameState = {
  name: "AAA",
};

const changeNameSlice = createSlice({
  name: "changename",
  initialState: initialState,
  reducers: {
    modfiyName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {modfiyName}= changeNameSlice.actions
export default changeNameSlice.reducer
