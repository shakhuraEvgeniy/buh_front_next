"use client"
import * as incomesApi from "@/app/utils/api/incomes";
import Table from "@/app/ui/Table/Table";
import { CostAndIncome } from "@/app/lib/definitions";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import stayles from "@/app/ui/Table/Table.module.css";

export default function Incomes() {
  const [incomes, setIncomes] = useState<CostAndIncome[]>([]);
  useEffect(() => { getIncomes() }, []);

  const getIncomes = async () => {
    try {
      const data = await incomesApi.getIncomesApi();
      setIncomes(data);
    } catch (e) {
      console.log(e);
    };
  }

  return (
    <>
      <Link className={stayles.link} href="/incomes/addIncome">
        <button className={stayles.addButton}>Добавить доход</button>
      </Link>
      <Table data={incomes} />
    </>
  );
};
