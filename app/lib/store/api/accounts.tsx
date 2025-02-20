import { MAIN_URL } from '@/app/lib/constants';
import { checkResponse } from '@/app/lib/store/api/checkResponse';
import { IAccounts, IAccountSort } from '@/app/lib/store/models/IAccount';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAccounts = createAsyncThunk(
  'accounts/fetchAccounts',
  async (sort: IAccountSort): Promise<IAccounts> => {
    try {
      const res = await fetch(`${MAIN_URL}/account/accounts?sort=${sort}`, {
        method: 'GET',
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }
);

export const fetchTransfer = createAsyncThunk(
  'accounts/fetchTransfer',
  async ({
    startIdAccount,
    finishIdAccount,
    sum,
  }: {
    startIdAccount: number;
    finishIdAccount: number;
    sum: number;
  }): Promise<IAccounts> => {
    try {
      const res = await fetch(`${MAIN_URL}/account/transfer`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startIdAccount,
          finishIdAccount,
          sum,
        }),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }
);
