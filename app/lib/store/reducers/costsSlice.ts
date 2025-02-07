import { addCostsApi, getCostsApi } from '@/app/utils/api/costs';
import { IAddCostAndIncome, ICostAndIncome } from '../models/ICostAndIncome';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CostState {
  costs: ICostAndIncome[];
  isLoading: boolean;
  error: string;
}

export const fetchCosts = createAsyncThunk(
  'costs/fetchCosts',
  async (limit: number) => {
    const response = await getCostsApi(limit);
    return response;
  }
);

export const fetchAddCost = createAsyncThunk(
  'costs/fetchAddCost',
  async (cost: IAddCostAndIncome) => {
    const response = await addCostsApi(cost);
    return response;
  }
);

const initialState: CostState = {
  costs: [],
  isLoading: false,
  error: '',
};

export const costSlice = createSlice({
  name: 'costs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCosts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchCosts.fulfilled,
        (state, action: PayloadAction<ICostAndIncome[]>) => {
          state.isLoading = false;
          state.costs.push(...action.payload);
        }
      )
      .addCase(fetchCosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch costs';
      })
      .addCase(fetchAddCost.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchAddCost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to add cost';
      });
  },
});

export default costSlice.reducer;
