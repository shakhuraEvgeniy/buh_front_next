'use client';
import * as costsApi from '@/app/utils/api/costs';
import Table from '@/app/ui/Table/Table';
import { CostAndIncome } from '@/app/utils/definitions';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import stayles from '@/app/ui/Table/Table.module.css';

export default function Costs() {
  const [costs, setCosts] = useState<CostAndIncome[]>([]);
  useEffect(() => {
    getCosts();
  }, []);

  const getCosts = async () => {
    try {
      const data = await costsApi.getCostsApi();
      setCosts(data);
    } catch (e) {
      console.log(e);
      setCosts([]);
    }
  };
  return (
    <>
      <Link className={stayles.link} href="/costs/addCost">
        <button className={stayles.addButton}>Добавить расход</button>
      </Link>
      <Table data={costs} />
    </>
  );
}
