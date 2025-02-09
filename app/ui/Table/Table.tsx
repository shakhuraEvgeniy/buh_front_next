import React from 'react';
import stayles from '@/app/ui/Table/Table.module.css';
import { ICostAndIncome } from '@/app/lib/store/models/ICostAndIncome';

interface ITableProps {
  data: ICostAndIncome[];
  handleClickItem: (item: ICostAndIncome) => void;
}

const Table = ({ data, handleClickItem }: ITableProps) => {
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

  const groupedData = data.reduce(
    (acc, item) => {
      const date = formatDate(item.create_time);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, ICostAndIncome[]>
  );

  return (
    <>
      <table className={stayles.table}>
        <thead>
          <tr>
            <th scope="col">Счет</th>
            <th scope="col">Сумма</th>
            <th scope="col">Категория</th>
            <th scope="col">Подкатегория</th>
            <th scope="col">Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((date) => (
            <React.Fragment key={date}>
              <tr>
                <td colSpan={5} className={stayles.date_group}>
                  {date}
                </td>
              </tr>
              {groupedData[date].map((item) => (
                <tr key={item.id} onClick={() => handleClickItem(item)}>
                  <td>{item.account}</td>
                  <td className={stayles.number}>
                    {formatNumber(Number(item.sum))}
                  </td>
                  <td>{item.category}</td>
                  <td>{item.sub_category}</td>
                  <td>{item.comment}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
