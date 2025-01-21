import { Category } from '@/app/lib/definitions';
import { MAIN_URL } from "../constants";

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getCategorysCostApi = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/categoryCost/categorys`, {
      method: "GET",
    });
    return await checkResponse(res);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const getSubCategorysCostApi = async (id: number): Promise<Category[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/categoryCost/subCategorys?idCategory=${id}`, {
      method: "GET",
    });
    return await checkResponse(res);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
}

export const getCategorysIncomeApi = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/categoryIncome/categorys`, {
      method: "GET",
    });
    return await checkResponse(res);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const getSubCategorysIncomeApi = async (id: number): Promise<Category[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/categoryIncome/subCategorys?idCategory=${id}`, {
      method: "GET",
    });
    return await checkResponse(res);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
}