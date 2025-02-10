import { MAIN_URL } from '@/app/utils/constants';
import { checkResponse } from '@/app/utils/api/checkResponse';
import { IPeriod, IReport } from '@/app/lib/store/models/IReport';

export const getReportIncomeApi = async ({
  startDate,
  stopDate,
}: IPeriod): Promise<IReport> => {
  try {
    const res = await fetch(`${MAIN_URL}/reports/income`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        stopDate,
      }),
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const getReportCostApi = async ({
  startDate,
  stopDate,
}: IPeriod): Promise<IReport> => {
  try {
    const res = await fetch(`${MAIN_URL}/reports/cost`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        stopDate,
      }),
    });
    return await checkResponse(res);
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};
