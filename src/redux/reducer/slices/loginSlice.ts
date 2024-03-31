import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  username: string;
  password: string;
}

const initialState: InitialState = {
  username: "",
  password: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    updateLogin: (state, action: PayloadAction<InitialState>) => {
      const { username, password } = action.payload;
      state.username = username;
      state.password = password;
    },
  },
});

export const { updateLogin } = toastSlice.actions;
export default toastSlice.reducer;
