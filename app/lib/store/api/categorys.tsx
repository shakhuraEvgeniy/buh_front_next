import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';
import { ICategory, ISubCategory } from '@/app/lib/store/models/ICategory';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategorysCost = createAsyncThunk(
  'category/fetchCategorysCost',
  async (): Promise<ICategory[]> => {
    try {
      const res = await fetch(`${MAIN_URL}/categoryCost/categorys`, {
        method: 'GET',
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching categorys:', error);
      throw error;
    }
  }
);

export const fetchSubCategorysCost = createAsyncThunk(
  'category/fetchSubCategorysCost',
  async (id: number): Promise<ISubCategory[]> => {
    try {
      const res = await fetch(
        `${MAIN_URL}/categoryCost/subCategorys?idCategory=${id}`,
        {
          method: 'GET',
        }
      );
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching categorys:', error);
      throw error;
    }
  }
);

export const fetchCategorysIncome = createAsyncThunk(
  'category/fetchCategorysIncome',
  async (): Promise<ICategory[]> => {
    try {
      const res = await fetch(`${MAIN_URL}/categoryIncome/categorys`, {
        method: 'GET',
      });
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching categorys:', error);
      throw error;
    }
  }
);

export const fetchSubCategorysIncome = createAsyncThunk(
  'category/fetchSubCategorysIncome',
  async (id: number): Promise<ISubCategory[]> => {
    try {
      const res = await fetch(
        `${MAIN_URL}/categoryIncome/subCategorys?idCategory=${id}`,
        {
          method: 'GET',
        }
      );
      return await checkResponse(res);
    } catch (error) {
      console.error('Error fetching categorys:', error);
      throw error;
    }
  }
);
