import { Report, ItemReports } from '@/app/utils/definitions';
import stayles from '@/app/ui/Table/Table.module.css';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';

interface recordProps {
  data: Report;
  title: string;
}

const TableReport = ({ data, title }: recordProps) => {
  const formatNumber = (number: number) => {
    return number.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    });
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>{title}</h2>
      <table className={stayles.table}>
        <thead>
          <tr>
            <th scope="col">Категория</th>
            <th scope="col">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {data.categorys &&
            data.categorys.map((item: ItemReports, index: number) => {
              return (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td className={stayles.number}>
                    {formatNumber(Number(item.sum))}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          {data.categorys && (
            <tr>
              <th scope="row" colSpan={1}>
                Итого:
              </th>
              <td className={stayles.number}>
                {formatNumber(Number(data.sum))}
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default TableReport;
