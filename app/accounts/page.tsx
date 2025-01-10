import TableAccounts from './tableAccounts';
import * as accountsApi from "@/app/utils/api/accounts";

export default async function Accounts() {
  const accounts = await accountsApi.getAccountsApi();

  return (
    <>
      {<TableAccounts data={accounts} />}
    </>
  );
};

