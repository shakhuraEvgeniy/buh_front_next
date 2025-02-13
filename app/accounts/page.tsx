'use client';
import TableAccounts from './tableAccounts';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/ui/Table/Table.module.css';
import stylesSubMenu from '@/app/ui/SubMenu/SubMenu.module.css';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchAccounts(sort));
  }, [sort, dispatch]);

  return (
    <>
      <div className={stylesSubMenu.subMenu}>
        <Filter />
        <Link className={styles.link} href="/accounts/transfer">
          <button className={styles.addButton}>Перенос средств</button>
        </Link>
      </div>
      {isLoading ? <LoaderPage /> : <TableAccounts data={accounts} />}
    </>
  );
}
