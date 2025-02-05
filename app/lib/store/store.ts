import { configureStore } from '@reduxjs/toolkit';
import accountSlice from '@/app/lib/store/reducers/accoutSlice';
import categorySlice from '@/app/lib/store/reducers/incomeCategorySlice';

export const store = configureStore({
  reducer: {
    accounts: accountSlice,
    categoryIncome: categorySlice,
  },
});

// Infer the type of the store
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
