import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ISubCategory } from '../models/ICategory';
import {
  fetchCategorysIncome,
  fetchSubCategorysIncome,
} from '../api/categorys';

interface CategoryState {
  categorys: ICategory[];
  subCategorys: ISubCategory[];
  isLoading: boolean;
  error: string;
}

const initialState: CategoryState = {
  categorys: [],
  subCategorys: [],
  isLoading: false,
  error: '',
};

export const incomeCategorySlice = createSlice({
  name: 'categoryIncome',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorysIncome.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchCategorysIncome.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.isLoading = false;
          state.categorys = action.payload;
        }
      )
      .addCase(fetchCategorysIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categorys';
      })
      .addCase(fetchSubCategorysIncome.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchSubCategorysIncome.fulfilled,
        (state, action: PayloadAction<ISubCategory[]>) => {
          state.isLoading = false;
          state.subCategorys = action.payload;
        }
      )
      .addCase(fetchSubCategorysIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch subCategorys';
      });
  },
});

export default incomeCategorySlice.reducer;
