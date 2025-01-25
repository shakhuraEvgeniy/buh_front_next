import { Report } from '@/app/utils/definitions';
import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';

export const getReportIncomeApi = async (): Promise<Report> => {
  try {
    const res = await fetch(`${MAIN_URL}/reports/income`, {
      method: 'GET',
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};
