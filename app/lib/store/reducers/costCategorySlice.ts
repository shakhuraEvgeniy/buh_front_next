import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ISubCategory } from '../models/ICategory';
import {
  getCategorysCostApi,
  getSubCategorysCostApi,
} from '@/app/utils/api/categorys';

interface CategoryState {
  categorys: ICategory[];
  subCategorys: ISubCategory[];
  isLoading: boolean;
  error: string;
}

export const fetchCategorysCost = createAsyncThunk(
  'category/fetchCategorysCost',
  async () => {
    const response = await getCategorysCostApi();
    return response;
  }
);

export const fetchSubCategorysCost = createAsyncThunk(
  'category/fetchSubCategorysCost',
  async (id: number) => {
    const response = await getSubCategorysCostApi(id);
    return response;
  }
);

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
