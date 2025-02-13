import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountFilters, IAccounts, IAccountSort } from '../models/IAccount';
import { getAccountsApi, transferAccountApi } from '@/app/utils/api/accounts';
import { sortType } from '../../filters/account/sortTtype';

interface AccountState {
  accounts: IAccounts;
  sort: IAccountSort;
  filter: IAccountFilters[];
  isLoading: boolean;
  error: string;
}

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async (sort: IAccountSort) => {
    const response = await getAccountsApi(sort);
    return response;
  }
);

export const fetchTransfer = createAsyncThunk(
  'accounts/fetchTransfer',
  async (data: {
    startIdAccount: number;
    finishIdAccount: number;
    sum: number;
  }) => {
    const response = await transferAccountApi(
      data.startIdAccount,
      data.finishIdAccount,
      data.sum
    );
    return response;
  }
);

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
