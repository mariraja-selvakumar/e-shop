import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import URLs from "../../../constants/URLs";

interface Item {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

type Items = Item[] | [];

interface InitialState {
  selectedCategory: string;
  isLoading: boolean;
  data: Items | [];
  error: string | null;
}

const initialState: InitialState = {
  selectedCategory: "",
  isLoading: false,
  data: [],
  error: null,
};

export const getItems = createAsyncThunk<AxiosResponse<Items>, string>(
  "api/category/items",
  async (category, thunkApi) => {
    try {
      const items = await axiosInstance({
        method: "GET",
        url: `${URLs.FILTER_BY_CATEGORY}${category}`,
      });

      return items?.data?.meals;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const itemSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(getItems.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getItems.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export const { updateCategory } = itemSlice.actions;
export default itemSlice.reducer;
