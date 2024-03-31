import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  show: boolean;
  message: string;
  severity: "error" | "success";
}

const initialState: InitialState = {
  show: false,
  message: "",
  severity: "error",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    updateToast: (state: InitialState, action: PayloadAction<InitialState>) => {
      const { show, severity, message } = action.payload;
      state.show = show;
      state.severity = severity;
      state.message = message;
    },
  },
});

export const { updateToast } = toastSlice.actions;
export default toastSlice.reducer;
