import { Accounts, Account } from "@/app/utils/definitions";
import stayles from "@/app/ui/Table/Table.module.css";

interface accountsProps {
  data: Accounts;
}

const TableAccounts = ({ data }: accountsProps) => {
  const formatNumber = (number: number) => {
    return number.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
    });
  };

  return (
    <>
      <table className={stayles.table}>
        <thead>
          <tr >
            <th scope="col">Категория</th>
            <th scope="col">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {data.accounts &&
            data.accounts.map((item: Account, index: number) => {
              return (
                <tr key={index}>
                  <td >{item.name}</td>
                  <td className={stayles.number}>{formatNumber(Number(item.current_sum))}</td>
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
              <td className={stayles.number}>{formatNumber(Number(data.sum))}</td>
            </tr>
          )}
        </tfoot>
      </table>
    </>
  );
};

export default TableAccounts;
