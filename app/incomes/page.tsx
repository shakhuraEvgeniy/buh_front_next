import * as incomesApi from "@/app/utils/api/incomes";
import Table from "@/app/ui/Table/Table";

export default async function Incomes() {

  const incomes = await incomesApi.getIncomesApi();

  return (
    <>
      {<Table data={incomes} />}
    </>
  );
};
