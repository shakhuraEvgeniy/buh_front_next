import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';
import { IReceivable } from '@/app/lib/store/models/IReceivables';

export const getReceivablesApi = async (): Promise<IReceivable[]> => {
  try {
    const res = await fetch(`${MAIN_URL}/receivables/getReceivables`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching getReceivables:', error);
    throw error;
  }
};
