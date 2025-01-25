'use client';
import { useEffect, useState } from 'react';
import { Account } from '../../utils/definitions';
import { useFormWithValidation } from '@/app/hooks/useFormWithValidation';
import * as accountsApi from '@/app/utils/api/accounts';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { useRouter } from 'next/navigation';

export default function Transfer() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { values, handleChange, isValid, resetForm } = useFormWithValidation({
    sum: 0,
    startIdAccount: 1,
    finishIdAccount: 2,
  });

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAccounts = async () => {
    try {
      const accounts = await accountsApi.getAccountsApi();
      setAccounts(accounts.accounts);
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await accountsApi.transferAccountApi(
        Number(values.startIdAccount),
        Number(values.finishIdAccount),
        Number(values.sum)
      );
      resetForm({
        sum: 0,
        startIdAccount: 1,
        finishIdAccount: 2,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    router.push('/accounts');
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Перенос средств</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Счет отправления:
          <select
            name="startIdAccount"
            onChange={handleChange}
            value={values.startIdAccount}
            required
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Счет назначения:
          <select
            name="finishIdAccount"
            onChange={handleChange}
            value={values.finishIdAccount}
            required
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Сумма:
          <input
            type="number"
            name="sum"
            placeholder="Сумма"
            step="0.01"
            inputMode="decimal"
            min="0"
            onChange={handleChange}
            value={values.sum || ''}
            required
          />
        </label>

        <button
          className={`${styles['button']} ${isValid || styles['button_disabled']}`}
          disabled={!isValid}
          type="submit"
        >
          Добавить
        </button>
        <button
          className={`${styles.button} ${styles['button_cansel']}`}
          onClick={handleCancel}
        >
          Закрыть
        </button>
      </form>
    </div>
  );
}
