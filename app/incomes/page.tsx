'use client';
import * as incomesApi from '@/app/utils/api/incomes';
import Table from '@/app/ui/Table/Table';
import { CostAndIncome } from '@/app/utils/definitions';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import stayles from '@/app/ui/Table/Table.module.css';

export default function Incomes() {
  const [incomes, setIncomes] = useState<CostAndIncome[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getIncomes();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [limit]);

  const getIncomes = async () => {
    setLoading(true);
    try {
      const data = await incomesApi.getIncomesApi(limit);
      setIncomes(data);
    } catch (e) {
      console.log(e);
      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setLimit((prevLimit) => prevLimit + 20);
  };

  return (
    <>
      <Link className={stayles.link} href="/incomes/addIncome">
        <button className={stayles.addButton}>Добавить доход</button>
      </Link>
      <Table data={incomes} />
      {loading && <p>Загрузка...</p>}
    </>
  );
}
