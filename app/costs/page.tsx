"use client"
import * as costsApi from "@/app/utils/api/costs";
import Table from "@/app/ui/Table/Table";
import { CostAndIncome } from "@/app/lib/definitions";
import { useEffect, useState } from 'react';

export default function Costs() {
  const [costs, setCosts] = useState<CostAndIncome[]>([]);
  useEffect(() => { getCosts() }, []);

  const getCosts = async () => {
    try {
      const data = await costsApi.getCostsApi();
      setCosts(data);
    } catch (e) {
      console.log(e);
      setCosts([]);
    }
  }
  return (
    <>
      {<Table data={costs} />}
    </>
  );
};