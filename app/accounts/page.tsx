'use client';
import TableAccounts from './tableAccounts';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/ui/Table/Table.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '@/app/lib/store/reducers/accoutSlice';
import { AppDispatch, RootState } from '../lib/store/store';
import Loader from '../ui/loader/Loader';

export default function AccountsPage() {
  const dispatch: AppDispatch = useDispatch();
  const { accounts, isLoading } = useSelector((state: RootState) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <>
      <Link className={styles.link} href="/accounts/transfer">
        <button className={styles.addButton}>Перенос средств</button>
      </Link>
      {!isLoading ? <TableAccounts data={accounts} /> : <Loader />}
    </>
  );
}