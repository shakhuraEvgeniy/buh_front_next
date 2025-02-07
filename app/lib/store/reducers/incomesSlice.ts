import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddCostAndIncome, ICostAndIncome } from '../models/ICostAndIncome';
import { addIncomeApi, getIncomesApi } from '@/app/utils/api/incomes';

interface IncomeState {
  incomes: ICostAndIncome[];
  isLoading: boolean;
  error: string;
}

export const fetchIncomes = createAsyncThunk(
  'incomes/fetchIncomes',
  async (limit: number) => {
    const response = await getIncomesApi(limit);
    return response;
  }
);

export const fetchAddIncome = createAsyncThunk(
  'incomes/fetchAddIncome',
  async (income: IAddCostAndIncome) => {
    const response = await addIncomeApi(income);
    return response;
  }
);

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
      });
  },
});

export default incomeSlice.reducer;
