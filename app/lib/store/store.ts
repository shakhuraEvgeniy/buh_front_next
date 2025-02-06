import { configureStore } from '@reduxjs/toolkit';
import accountSlice from '@/app/lib/store/reducers/accoutSlice';
import incomeCategorySlice from '@/app/lib/store/reducers/incomeCategorySlice';
import incomeSlice from './reducers/incomes';
import costSlice from './reducers/costs';
import costCategorySlice from './reducers/costCategorySlice';

export const store = configureStore({
  reducer: {
    accounts: accountSlice,
    categoryIncome: incomeCategorySlice,
    categoryCost: costCategorySlice,
    incomes: incomeSlice,
    costs: costSlice,
  },
});

// Infer the type of the store
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
