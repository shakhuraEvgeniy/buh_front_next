'use client';
import { useEffect } from 'react';
import TableReceivables from './tableDebt';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../lib/store/store';
import { useSelector } from 'react-redux';
import { fetchReceivables } from '../lib/store/reducers/receivablesSlice';
import Loader from '../ui/loader/Loader';

export default function ReceivablesPage() {
  const dispatch: AppDispatch = useDispatch();
  const { receivables, isLoading } = useSelector((state: RootState) => state.receivables);

  useEffect(() => {
    dispatch(fetchReceivables());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <Loader /> : <TableReceivables data={receivables} />}
    </div>
  );
}
