import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeriod, IReport } from '../models/IReport';
import { getReportCostApi, getReportIncomeApi } from '@/app/utils/api/reports';

interface IReportState {
  incomeReport: IReport;
  costReport: IReport;
  isLoading: boolean;
  error: string;
}

export const fetchIncomeReport = createAsyncThunk(
  'reports/fetchIncomeReport',
  async (period: IPeriod) => {
    return await getReportIncomeApi(period);
  }
);

export const fetchCostReport = createAsyncThunk(
  'reports/fetchCostReport',
  async (period: IPeriod) => {
    return await getReportCostApi(period);
  }
);

const initialState: IReportState = {
  incomeReport: { categorys: [], sum: 0 },
  costReport: { categorys: [], sum: 0 },
  isLoading: false,
  error: '',
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeReport.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchIncomeReport.fulfilled,
        (state, action: PayloadAction<IReport>) => {
          state.isLoading = false;
          state.incomeReport = action.payload;
        }
      )
      .addCase(fetchIncomeReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to income report';
      })
      .addCase(fetchCostReport.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        fetchCostReport.fulfilled,
        (state, action: PayloadAction<IReport>) => {
          state.isLoading = false;
          state.costReport = action.payload;
        }
      )
      .addCase(fetchCostReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to cost report';
      });
  },
});

export default reportsSlice.reducer;
