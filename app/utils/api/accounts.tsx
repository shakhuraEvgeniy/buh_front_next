import { MAIN_URL } from "../constants";
import { Accounts } from '@/app/lib/definitions';

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getAccountsApi = async (): Promise<Accounts> => {
  try {
    const res = await fetch(`${MAIN_URL}/account/accounts`, {
      method: "GET",
    });
    return await checkResponse(res);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};
