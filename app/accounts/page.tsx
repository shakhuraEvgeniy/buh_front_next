'use client';
import TableAccounts from './tableAccounts';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/ui/Table/Table.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '@/app/lib/store/reducers/accountSlice';
import { AppDispatch, RootState } from '../lib/store/store';
import LoaderPage from '../ui/loaders/Loader__page';
import Filter from '../ui/Filter/Filter';

export default function AccountsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { accounts, isLoading, sort } = useSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    dispatch(fetchAccounts(sort));
  }, []);

  useEffect(() => {
    dispatch(fetchAccounts(sort))
  }, [sort, dispatch])

  return (
    <>
      <Filter />
      <Link className={styles.link} href="/accounts/transfer">
        <button className={styles.addButton}>Перенос средств</button>
      </Link>
      {isLoading ? <LoaderPage /> : <TableAccounts data={accounts} />}
    </>
  );
}
