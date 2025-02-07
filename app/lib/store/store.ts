import { configureStore } from '@reduxjs/toolkit';
import accountSlice from '@/app/lib/store/reducers/accoutSlice';
import incomeCategorySlice from '@/app/lib/store/reducers/incomeCategorySlice';
import incomeSlice from './reducers/incomesSlice';
import costSlice from './reducers/costsSlice';
import costCategorySlice from './reducers/costCategorySlice';
import receivablesSlice from './reducers/receivablesSlice';
import reportsSlice from './reducers/reportSlice';

export const store = configureStore({
  reducer: {
    accounts: accountSlice,
    categoryIncome: incomeCategorySlice,
    categoryCost: costCategorySlice,
    incomes: incomeSlice,
    costs: costSlice,
    receivables: receivablesSlice,
    reports: reportsSlice,
  },
});

// Infer the type of the store
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
