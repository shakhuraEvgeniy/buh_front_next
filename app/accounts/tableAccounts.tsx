import stayles from '@/app/ui/Table/Table.module.css';
import { IAccount, IAccounts } from '../lib/store/models/IAccount';

interface accountsProps {
  data: IAccounts;
}

const TableAccounts = ({ data }: accountsProps) => {
  const formatNumber = (number: number) => {
    return number.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    });
  };

  return (
    <>
      <table className={stayles.table}>
        <thead>
          <tr>
            <th scope="col">Наименование</th>
            <th scope="col">Текущий баланс</th>
            <th scope="col">Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {data.accounts &&
            data.accounts.map((item: IAccount) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className={stayles.number}>
                    {formatNumber(Number(item.current_sum))}
                  </td>
                  <td>{item.comment}</td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          {data.accounts && (
            <tr>
              <th scope="row" colSpan={1}>
                Итого на всех счетах:
              </th>
              <td className={stayles.number}>
                {formatNumber(Number(data.sum))}
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </>
  );
};

export default TableAccounts;
