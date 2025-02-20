import { IReport, IItemReports } from '@/app/lib/store/models/IReport';
import stayles from '@/app/ui/Table/Table.module.css';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { formatSumm } from '../lib/utils/formatSumm';

interface recordProps {
  data: IReport;
  title: string;
}

const TableReport = ({ data, title }: recordProps) => {
  const chartData = {
    labels: data.categorys.map((item: IItemReports) => item.category),
    datasets: [
      {
        data: data.categorys.map((item: IItemReports) => Number(item.sum)),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <>
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
              data.categorys.map((item: IItemReports, index: number) => {
                return (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td className={stayles.number}>
                      {formatSumm(Number(item.sum))}
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
                  {formatSumm(Number(data.sum))}
                </td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <Doughnut data={chartData} />
    </>
  );
};

export default TableReport;
