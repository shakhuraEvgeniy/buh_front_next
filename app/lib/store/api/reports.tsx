import { MAIN_URL } from '@/app/lib/constants';
import { checkResponse } from '@/app/lib/store/api/checkResponse';
import { IPeriod, IReport } from '@/app/lib/store/models/IReport';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIncomeReport = createAsyncThunk(
  'reports/fetchIncomeReport',
  async (period: IPeriod): Promise<IReport> => {
    try {
      const res = await fetch(`${MAIN_URL}/reports/income`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(period),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }
);

export const fetchCostReport = createAsyncThunk(
  'reports/fetchCostReport',
  async (period: IPeriod): Promise<IReport> => {
    try {
      const res = await fetch(`${MAIN_URL}/reports/cost`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(period),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }
);
