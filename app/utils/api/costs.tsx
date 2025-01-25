import { CostAndIncome } from '@/app/utils/definitions';
import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';

export const getCostsApi = async (): Promise<CostAndIncome[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/cost/costs?limit=100`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching costs:', error);
    throw error;
  }
};

export const addCostsApi = async (
  accountId: number,
  createTime: Date,
  sum: number,
  categoryId: number,
  subCategoryId: number | null,
  comment: string
) => {
  try {
    const res = await fetch(`${MAIN_URL}/cost/cost`, {
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
    console.error('Error fetching costs:', error);
    throw error;
  }
};
