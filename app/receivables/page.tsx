'use client';
import { useEffect } from 'react';
import TableReceivables from './tableDebt';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store/store';
import { useSelector } from 'react-redux';
import { fetchReceivables } from '../lib/store/reducers/receivablesSlice';
import LoaderPage from '../ui/loaders/Loader__page';

export default function ReceivablesPage() {
  const dispatch: AppDispatch = useDispatch();
  const { receivables, isLoading } = useSelector(
    (state: RootState) => state.receivables
  );

  useEffect(() => {
    dispatch(fetchReceivables());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <LoaderPage /> : <TableReceivables data={receivables} />}
    </div>
  );
}
