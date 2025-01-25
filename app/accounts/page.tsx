'use client';
import TableAccounts from './tableAccounts';
import * as accountsApi from '@/app/utils/api/accounts';
import { Accounts } from '@/app/utils/definitions';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import stayles from '@/app/ui/Table/Table.module.css';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Accounts>({
    accounts: [],
    sum: '0',
  });

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    try {
      const data = await accountsApi.getAccountsApi();
      setAccounts(data);
    } catch (e) {
      console.log(e);
      setAccounts({ accounts: [], sum: '0' });
    }
  };

  return (
    <>
      <Link className={stayles.link} href="/accounts/transfer">
        <button className={stayles.addButton}>Перенос средств</button>
      </Link>
      <TableAccounts data={accounts} />
    </>
  );
}
