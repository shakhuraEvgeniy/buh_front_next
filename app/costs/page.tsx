import * as costsApi from "@/app/utils/api/costs";
import Table from "@/app/ui/Table/Table";

export default async function Costs() {
  const costs = await costsApi.getCostsApi();
  return (
    <>
      {<Table data={costs} />}
    </>
  );
};