import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICostAndIncome } from '../models/ICostAndIncome';
import {
  fetchAddIncome,
  fetchDeleteIncome,
  fetchIncomes,
  fetchUpdateIncome,
} from '@/app/lib/store/api/incomes';

interface IncomeState {
  incomes: ICostAndIncome[];
  isLoading: boolean;
  error: string;
}

const initialState: IncomeState = {
  incomes: [],
  isLoading: false,
  error: '',
};

export const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchIncomes.fulfilled,
        (state, action: PayloadAction<ICostAndIncome[]>) => {
          state.isLoading = false;
          state.incomes = action.payload;
        }
      )
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch incomes';
      })
      .addCase(fetchAddIncome.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchAddIncome.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to add income';
      })
      .addCase(fetchUpdateIncome.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUpdateIncome.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update income';
      })
      .addCase(fetchDeleteIncome.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchDeleteIncome.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDeleteIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete income';
      });
  },
});

export default incomeSlice.reducer;
