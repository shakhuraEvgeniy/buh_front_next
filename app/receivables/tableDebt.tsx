import { Receivables } from '@/app/utils/definitions';
import stayles from '@/app/ui/Table/Table.module.css';

interface receivablesProps {
  data: Receivables[];
}

const TableReceivables = ({ data }: receivablesProps) => {
  const formatNumber = (number: number) => {
    return number.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    });
  };

  const formatDate = (dateString: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
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
            data.map((item: Receivables) => {
              return (
                <tr key={item.id}>
                  <td>{item.debtor}</td>
                  <td className={stayles.number}>
                    {formatNumber(item.amount_of_debt)}
                  </td>
                  <td className={stayles.number}>
                    {formatNumber(item.funds_repaid)}
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
