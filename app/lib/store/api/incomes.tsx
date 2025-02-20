import { MAIN_URL } from '@/app/lib/constants';
import { checkResponse } from '@/app/lib/store/api/checkResponse';
import {
  IAddCostAndIncome,
  ICostAndIncome,
  IUpdateIncome,
} from '@/app/lib/store/models/ICostAndIncome';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIncomes = createAsyncThunk(
  'incomes/fetchIncomes',
  async (limit: number): Promise<ICostAndIncome[]> => {
    try {
      const res = await fetch(`${MAIN_URL}/income/incomes?limit=${limit}`, {
        method: 'GET',
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error;
    }
  }
);

export const fetchAddIncome = createAsyncThunk(
  'incomes/fetchAddIncome',
  async (income: IAddCostAndIncome): Promise<ICostAndIncome> => {
    try {
      const res = await fetch(`${MAIN_URL}/income/addIncome`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(income),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error;
    }
  }
);

export const fetchUpdateIncome = createAsyncThunk(
  'incomes/fetchUpdateIncome',
  async (income: IUpdateIncome): Promise<ICostAndIncome> => {
    try {
      const res = await fetch(`${MAIN_URL}/income/income`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(income),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error;
    }
  }
);

export const fetchDeleteIncome = createAsyncThunk(
  'incomes/fetchDeleteIncome',
  async (incomeId: number): Promise<void> => {
    try {
      const res = await fetch(`${MAIN_URL}/income/income`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          incomeId,
        }),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error;
    }
  }
);
