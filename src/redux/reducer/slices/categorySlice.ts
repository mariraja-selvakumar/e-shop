import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import URLs from "../../../constants/URLs";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

type Categories = Category[] | [];

interface InitialState {
  isLoading: boolean;
  data: Categories | [];
  error: string | null;
}

const initialState: InitialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const getCategories = createAsyncThunk<AxiosResponse<Categories>>(
  "api/categories",
  async (_, thunkApi) => {
    try {
      const categories = await axiosInstance({
        method: "GET",
        url: `${URLs.CATEGORIES}`,
      });
      return categories?.data?.categories;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
