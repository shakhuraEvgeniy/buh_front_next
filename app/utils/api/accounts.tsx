import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';
import { IAccounts, IAccountSort } from '@/app/lib/store/models/IAccount';

export const getAccountsApi = async (
  sort: IAccountSort
): Promise<IAccounts> => {
  try {
    const res = await fetch(`${MAIN_URL}/account/accounts?sort=${sort}`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

export const transferAccountApi = async (
  startIdAccount: number,
  finishIdAccount: number,
  sum: number
): Promise<IAccounts> => {
  try {
    const res = await fetch(`${MAIN_URL}/account/transfer`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startIdAccount,
        finishIdAccount,
        sum,
      }),
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};
