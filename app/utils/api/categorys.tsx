import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';
import { ICategory, ISubCategory } from '@/app/lib/store/models/ICategory';

export const getCategorysCostApi = async (): Promise<ICategory[]> => {
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
): Promise<ICategory[]> => {
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

export const getCategorysIncomeApi = async (): Promise<ICategory[]> => {
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
): Promise<ISubCategory[]> => {
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
