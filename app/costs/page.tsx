'use client';
import * as costsApi from '@/app/utils/api/costs';
import Table from '@/app/ui/Table/Table';
import { CostAndIncome } from '@/app/utils/definitions';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import stayles from '@/app/ui/Table/Table.module.css';

export default function Costs() {
  const [costs, setCosts] = useState<CostAndIncome[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [limit]);

  const getCosts = async () => {
    setLoading(true);
    try {
      const data = await costsApi.getCostsApi(limit);
      setCosts(data);
    } catch (e) {
      console.log(e);
      setCosts([]);
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
      <Link className={stayles.link} href="/costs/addCost">
        <button className={stayles.addButton}>Добавить расход</button>
      </Link>
      <Table data={costs} />
      {loading && <p>Загрузка...</p>}
    </>
  );
}
