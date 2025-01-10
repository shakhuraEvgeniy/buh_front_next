// import "@/app/ui/TableAccounts/TableAccounts.module.css";
import { Accounts, Account } from "@/app/lib/definitions";
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
            <th scope="col">Наименование</th>
            <th scope="col">Текущий баланс</th>
            <th scope="col">Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {data.accounts &&
            data.accounts.map((item: Account) => {
              return (
                <tr key={item.id}>
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
