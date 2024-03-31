import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import URLs from "../../../constants/URLs";

type ItemDetails = any;

interface InitialState {
  isLoading: boolean;
  data: ItemDetails;
  error: string | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: {},
  error: null,
};

export const getItemDetails = createAsyncThunk<
  AxiosResponse<any>,
  string | null
>("api/category/items/id", async (id, thunkApi) => {
  try {
    const items = await axiosInstance({
      method: "GET",
      url: `${URLs.FILTER_BY_ID}${id}`,
    });
    return items?.data?.meals[0];
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const itemDetailsSlice = createSlice({
  name: "categories/item/id",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItemDetails.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(
        getItemDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(getItemDetails.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export default itemDetailsSlice.reducer;
