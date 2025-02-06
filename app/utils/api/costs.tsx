import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';
import { IAddCostAndIncome, ICostAndIncome } from '@/app/lib/store/models/ICostAndIncome';

export const getCostsApi = async (limit: number): Promise<ICostAndIncome[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/cost/costs?limit=${limit}`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching costs:', error);
    throw error;
  }
};

export const addCostsApi = async ({
  accountId,
  createTime,
  sum,
  categoryId,
  subCategoryId,
  comment
}: IAddCostAndIncome
): Promise<ICostAndIncome> => {
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
