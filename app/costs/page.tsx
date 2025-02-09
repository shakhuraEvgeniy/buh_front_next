'use client';
import Table from '@/app/ui/Table/Table';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import stayles from '@/app/ui/Table/Table.module.css';
import { AppDispatch, RootState } from '../lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCosts } from '../lib/store/reducers/costsSlice';
import Loader from '../ui/loader/Loader';
import { ICostAndIncome } from '../lib/store/models/ICostAndIncome';
import { useRouter } from 'next/navigation';

export default function Costs() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [limit, setLimit] = useState<number>(20);
  const { costs, isLoading } = useSelector((state: RootState) => state.costs);

  useEffect(() => {
    dispatch(fetchCosts(limit));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, dispatch]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    setLimit((prevLimit) => prevLimit + 20);
  };

  const handleClickItem = (item: ICostAndIncome) => {
    router.push(`/costs/${item.id}/edit`);
  };

  return (
    <>
      <Link className={stayles.link} href="/costs/addCost">
        <button className={stayles.addButton}>Добавить расход</button>
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        <Table data={costs} handleClickItem={handleClickItem} />
      )}
    </>
  );
}
