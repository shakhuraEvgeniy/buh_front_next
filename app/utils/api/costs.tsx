import { MAIN_URL } from "../constants";

const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getCostsApi = async () => {
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
