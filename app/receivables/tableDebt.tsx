import { IReceivable } from '@/app/lib/store/models/IReceivables';
import stayles from '@/app/ui/Table/Table.module.css';
import { formatDate } from '../lib/utils/date';
import { formatSumm } from '../lib/utils/formatSumm';
import { useRouter } from 'next/navigation';

interface receivablesProps {
  data: IReceivable[];
}

const TableReceivables = ({ data }: receivablesProps) => {
  const router = useRouter();

  const handleClickItem = (item: IReceivable) => {
    router.push(`/receivables/${item.id}/refunds`);
  };

  return (
    <>
      <table className={stayles.table}>
        <thead>
          <tr>
            <th scope="col">Должник</th>
            <th scope="col">Сумма долга</th>
            <th scope="col">Возвращено</th>
            <th scope="col">Дата выдачи</th>
            <th scope="col">Долг закрыт</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: IReceivable) => {
              return (
                <tr key={item.id} onClick={() => handleClickItem(item)}>
                  <td>{item.debtor}</td>
                  <td className={stayles.number}>
                    {formatSumm(item.amount_of_debt)}
                  </td>
                  <td className={stayles.number}>
                    {formatSumm(item.funds_repaid)}
                  </td>
                  <td>{formatDate(item.create_time)}</td>
                  <td>{item.debt_repaid === true ? 'Да' : 'Нет'}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableReceivables;
