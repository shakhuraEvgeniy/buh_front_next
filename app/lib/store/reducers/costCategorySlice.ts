import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ISubCategory } from '../models/ICategory';
import {
  fetchCategorysCost,
  fetchSubCategorysCost,
} from '@/app/lib/store/api/categorys';

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

export const costCategorySlice = createSlice({
  name: 'categoryCost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorysCost.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchCategorysCost.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.isLoading = false;
          state.categorys = action.payload;
        }
      )
      .addCase(fetchCategorysCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categorys';
      })
      .addCase(fetchSubCategorysCost.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchSubCategorysCost.fulfilled,
        (state, action: PayloadAction<ISubCategory[]>) => {
          state.isLoading = false;
          state.subCategorys = action.payload;
        }
      )
      .addCase(fetchSubCategorysCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch subCategorys';
      });
  },
});

export default costCategorySlice.reducer;
