import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountFilters, IAccounts, IAccountSort } from '../models/IAccount';
import { fetchAccounts, fetchTransfer } from '@/app/lib/store/api/accounts';
import { sortType } from '../../filters/account/sortTtype';

interface AccountState {
  accounts: IAccounts;
  sort: IAccountSort;
  filter: IAccountFilters[];
  isLoading: boolean;
  error: string;
}

const initialState: AccountState = {
  accounts: { accounts: [], sum: 0 },
  sort: 'all',
  filter: sortType,
  isLoading: false,
  error: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.sort = action.payload.sort;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchAccounts.fulfilled,
        (state, action: PayloadAction<IAccounts>) => {
          state.isLoading = false;
          state.accounts = action.payload;
        }
      )
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch accounts';
      })
      .addCase(fetchTransfer.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchTransfer.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchTransfer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to transfer account';
      });
  },
});

export default accountSlice.reducer;

export const { changeFilter } = accountSlice.actions;
