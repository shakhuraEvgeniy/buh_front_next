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

export const addCostsApi = async () => {
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