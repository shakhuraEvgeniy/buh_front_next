"use client"
import { useEffect, useState } from 'react';
import { Account } from '../lib/definitions';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import * as accountsApi from "@/app/utils/api/accounts";
import styles from "@/app/ui/addItemForm/addItemForm.module.css"

export default function Transfer() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { values, handleChange, isValid, resetForm } = useFormWithValidation({
    sum: 0,
    startIdAccount: 1,
    finishIdAccount: 2
  });

  useEffect(() => {
    getAccounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAccounts = async () => {
    try {
      const accounts = await accountsApi.getAccountsApi();
      setAccounts(accounts.accounts);
      // values.startIdAccount = accounts.accounts[0].id;
      // values.finishIdAccount = accounts.accounts[1].id;
      console.log(values);

    } catch (e) {
      console.log(e);
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await accountsApi.transferAccountApi(Number(values.startIdAccount), Number(values.finishIdAccount), Number(values.sum));
      resetForm({
        sum: 0,
        startIdAccount: 1,
        finishIdAccount: 2,
      })
    } catch (e) {
      console.log(e);
    };
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Счет отправления:
          <select name='startIdAccount' onChange={handleChange} value={values.startIdAccount} required>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Счет назначения:
          <select name='finishIdAccount' onChange={handleChange} value={values.finishIdAccount} required>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Сумма:
          <input type="number" name='sum' placeholder="Сумма" onChange={handleChange} value={values.sum || ""} required />
        </label>

        <button className={`${styles['button']} ${isValid || styles["button_disabled"]}`} disabled={!isValid} type="submit">Добавить</button>
        <button className={`${styles.button} ${styles['button_cansel']} `}>Отменить</button>
      </form>
    </>
  )
}