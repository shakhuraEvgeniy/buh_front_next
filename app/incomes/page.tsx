'use client';
import Table from '@/app/ui/Table/Table';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import stayles from '@/app/ui/Table/Table.module.css';
import { AppDispatch, RootState } from '../lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncomes } from '../lib/store/reducers/incomesSlice';
import Loader from '../ui/loader/Loader';
import { useRouter } from 'next/navigation';
import { ICostAndIncome } from '../lib/store/models/ICostAndIncome';

export default function Incomes() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [limit, setLimit] = useState<number>(20);
  const { incomes, isLoading } = useSelector(
    (state: RootState) => state.incomes
  );

  useEffect(() => {
    dispatch(fetchIncomes(limit));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit]);

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
    router.push(`/incomes/${item.id}/edit`);
  };

  return (
    <>
      <Link className={stayles.link} href="/incomes/addIncome">
        <button className={stayles.addButton}>Добавить доход</button>
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        <Table data={incomes} handleClickItem={handleClickItem} />
      )}
    </>
  );
}
