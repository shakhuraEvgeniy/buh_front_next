import { MAIN_URL } from '@/app/lib/constants';
import { checkResponse } from '@/app/lib/store/api/checkResponse';
import { IReceivable, IRefund } from '@/app/lib/store/models/IReceivables';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReceivables = createAsyncThunk(
  'receivables/fetchReceivables',
  async (): Promise<IReceivable[]> => {
    try {
      const res = await fetch(`${MAIN_URL}/receivables/getReceivables`, {
        method: 'GET',
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching getReceivables:', error);
      throw error;
    }
  }
);

export const fetchGetRufunds = createAsyncThunk(
  'receivables/featchGetRefunds',
  async (id: number): Promise<IRefund[]> => {
    try {
      const res = await fetch(
        `${MAIN_URL}/receivables/getRefunds?receivableId=${id}`,
        {
          method: 'GET',
        }
      );
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching getReceivables:', error);
      throw error;
    }
  }
);
