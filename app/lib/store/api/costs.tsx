import { MAIN_URL } from '@/app/lib/constants';
import { checkResponse } from '@/app/lib/store/api/checkResponse';
import {
  IAddCostAndIncome,
  ICostAndIncome,
  IUpdateCost,
} from '@/app/lib/store/models/ICostAndIncome';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCosts = createAsyncThunk(
  'costs/fetchCosts',
  async (limit: number): Promise<ICostAndIncome[]> => {
    try {
      const res = await fetch(`${MAIN_URL}/cost/costs?limit=${limit}`, {
        method: 'GET',
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching costs:', error);
      throw error;
    }
  }
);

export const fetchAddCost = createAsyncThunk(
  'costs/fetchAddCost',
  async (cost: IAddCostAndIncome): Promise<ICostAndIncome> => {
    try {
      const res = await fetch(`${MAIN_URL}/cost/cost`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cost),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching costs:', error);
      throw error;
    }
  }
);

export const fetchUpdateCost = createAsyncThunk(
  'costs/fetchUpdateCost',
  async (cost: IUpdateCost): Promise<ICostAndIncome> => {
    try {
      const res = await fetch(`${MAIN_URL}/cost/cost`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cost),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching costs:', error);
      throw error;
    }
  }
);

export const fetchDeleteCost = createAsyncThunk(
  'costs/fetchDeleteCost',
  async (costId: number): Promise<ICostAndIncome> => {
    try {
      const res = await fetch(`${MAIN_URL}/cost/cost/`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          costId,
        }),
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching costs:', error);
      throw error;
    }
  }
);
