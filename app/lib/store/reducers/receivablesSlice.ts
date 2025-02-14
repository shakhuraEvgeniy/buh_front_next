import { fetchReceivables } from '@/app/lib/store/api/receivables';
import { IReceivable } from '../models/IReceivables';
import { createSlice } from '@reduxjs/toolkit';

interface ReceivableState {
  receivables: IReceivable[];
  isLoading: boolean;
  error: string;
}

const initialState: ReceivableState = {
  receivables: [],
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
      });
  },
});

export default receivablesSlice.reducer;
