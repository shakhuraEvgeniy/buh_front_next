import { Category } from '@/app/utils/definitions';
import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';

export const getCategorysCostApi = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/categoryCost/categorys`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching categorys:', error);
    throw error;
  }
};

export const getSubCategorysCostApi = async (
  id: number
): Promise<Category[]> => {
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
};

export const getCategorysIncomeApi = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/categoryIncome/categorys`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching categorys:', error);
    throw error;
  }
};

export const getSubCategorysIncomeApi = async (
  id: number
): Promise<Category[]> => {
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
};
