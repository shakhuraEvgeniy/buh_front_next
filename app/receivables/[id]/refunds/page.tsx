'use client';
import { AppDispatch, RootState } from '@/app/lib/store/store';
// import { useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stayles from '@/app/ui/Table/Table.module.css';
import stylesSubMenu from '@/app/ui/SubMenu/SubMenu.module.css';
import { IRefund } from '@/app/lib/store/models/IReceivables';
import { formatDate } from '@/app/lib/utils/date';
import { formatSumm } from '@/app/lib/utils/formatSumm';
import { fetchGetRufunds } from '@/app/lib/store/api/receivables';
import Link from 'next/link';

type Params = Promise<{ id: string }>;

export default function RefundsList(props: { params: Params }) {
  const { id } = use(props.params);
  // const router = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const { refunds } = useSelector((state: RootState) => state.receivables);

  useEffect(() => {
    dispatch(fetchGetRufunds(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={stylesSubMenu.subMenu}>
        <Link className={stayles.link} href={`/receivables/${id}/addRefund`}>
          <button className={stayles.addButton}>Добавить возврат</button>
        </Link>
      </div>
      <table className={stayles.table}>
        <thead>
          <tr>
            <th scope="col">Дата возврата</th>
            <th scope="col">Сумма возврата</th>
            <th scope="col">Возвращено на счет</th>
          </tr>
        </thead>
        <tbody>
          {refunds &&
            refunds.map((item: IRefund) => {
              return (
                <tr key={item.id}>
                  <td>{formatDate(item.create_time)}</td>
                  <td className={stayles.number}>{formatSumm(item.sum)}</td>
                  <td>{item.account}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
