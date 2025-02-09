import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';
import {
  IAddCostAndIncome,
  ICostAndIncome,
  IUpdateIncome,
} from '@/app/lib/store/models/ICostAndIncome';

export const getIncomesApi = async (
  limit: number
): Promise<ICostAndIncome[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/income/incomes?limit=${limit}`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    throw error;
  }
};

export const addIncomeApi = async ({
  accountId,
  createTime,
  sum,
  categoryId,
  subCategoryId,
  comment,
}: IAddCostAndIncome): Promise<ICostAndIncome> => {
  try {
    const res = await fetch(`${MAIN_URL}/income/addIncome`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId,
        createTime,
        sum,
        categoryId,
        subCategoryId,
        comment,
      }),
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    throw error;
  }
};

export const updateIncomeApi = async ({
  incomeId,
  accountId,
  createTime,
  sum,
  categoryId,
  subCategoryId,
  comment,
}: IUpdateIncome): Promise<ICostAndIncome> => {
  try {
    const res = await fetch(`${MAIN_URL}/income/income`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incomeId,
        accountId,
        createTime,
        sum,
        categoryId,
        subCategoryId,
        comment,
      }),
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    throw error;
  }
};