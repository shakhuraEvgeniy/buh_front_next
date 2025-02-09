import {
  addCostsApi,
  deleteCostApi,
  getCostsApi,
  updateCostApi,
} from '@/app/utils/api/costs';
import {
  IAddCostAndIncome,
  ICostAndIncome,
  IUpdateCost,
} from '../models/ICostAndIncome';
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

export const fetchUpdateCost = createAsyncThunk(
  'costs/fetchUpdateCost',
  async (cost: IUpdateCost) => {
    const response = await updateCostApi(cost);
    return response;
  }
);

export const fetchDeleteCost = createAsyncThunk(
  'costs/fetchDeleteCost',
  async (costId: number) => {
    const response = await deleteCostApi(costId);
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
          state.costs = action.payload;
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
      })
      .addCase(fetchUpdateCost.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUpdateCost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update cost';
      })
      .addCase(fetchDeleteCost.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchDeleteCost.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDeleteCost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete cost';
      });
  },
});

export default costSlice.reducer;
