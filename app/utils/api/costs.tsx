import { CostAndIncome } from '@/app/lib/definitions';
import { MAIN_URL } from "../constants";

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getCostsApi = async (): Promise<CostAndIncome[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/cost/costs?limit=100`, {
      method: "GET",
    });
    return await checkResponse(res);
  } catch (error) {
    console.error("Error fetching costs:", error);
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
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId,
        createTime,
        sum,
        categoryId,
        subCategoryId,
        comment
      }),
    });
    return await checkResponse(res);
  } catch (error) {
    console.error("Error fetching costs:", error);
    throw error;
  }
};