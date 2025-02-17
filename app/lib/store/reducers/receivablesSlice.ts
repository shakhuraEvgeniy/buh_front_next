import {
  fetchGetRufunds,
  fetchReceivables,
} from '@/app/lib/store/api/receivables';
import { IReceivable, IRefund } from '../models/IReceivables';
import { createSlice } from '@reduxjs/toolkit';

interface ReceivableState {
  receivables: IReceivable[];
  refunds: IRefund[];
  isLoading: boolean;
  error: string;
}

const initialState: ReceivableState = {
  receivables: [],
  refunds: [],
  isLoading: false,
  error: '',
};

export const receivablesSlice = createSlice({
  name: 'receivables',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReceivables.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchReceivables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.receivables = action.payload;
      })
      .addCase(fetchReceivables.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch receivables';
      })
      .addCase(fetchGetRufunds.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchGetRufunds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.refunds = action.payload;
      })
      .addCase(fetchGetRufunds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch refunds';
      });
  },
});

export default receivablesSlice.reducer;
