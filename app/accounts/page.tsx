"use client"
import TableAccounts from './tableAccounts';
import * as accountsApi from "@/app/utils/api/accounts";
import { Accounts } from "@/app/lib/definitions";
import { useEffect, useState } from 'react';

export default function AccountsPage() {

  const [accounts, setAccounts] = useState<Accounts>({ accounts: [], sum: "0" });

  useEffect(() => { getAccounts() }, []);

  const getAccounts = async () => {
    try {
      const data = await accountsApi.getAccountsApi();
      setAccounts(data);
    } catch (e) {
      console.log(e);
      setAccounts({ accounts: [], sum: "0" });
    }
  }

  return (
    <>
      {<TableAccounts data={accounts} />}
    </>
  );
};

