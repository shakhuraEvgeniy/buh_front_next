'use client';
import { useEffect } from 'react';
import { useFormWithValidation } from '@/app/lib/hooks/useFormWithValidation';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, fetchTransfer } from '@/app/lib/store/api/accounts';
// import { formatSumm } from '@/app/lib/utils/formatSumm';

export default function Transfer() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { accounts, isLoading } = useSelector(
    (state: RootState) => state.accounts
  );

  const { values, handleChange, isValid, resetForm } = useFormWithValidation({
    sum: 0,
    startIdAccount: 2,
    finishIdAccount: 1,
  });

  useEffect(() => {
    dispatch(fetchAccounts('all'));
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(fetchTransfer(values));
      resetForm({
        sum: 0,
        startIdAccount: 2,
        finishIdAccount: 1,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    router.push('/accounts');
  };

  // const startAccountSum: number = accounts.accounts[values.startIdAccount].current_sum
  // const finishAccountSum: number = accounts.accounts[values.finishIdAccount].current_sum

  // const startAccountSumString: string = formatSumm(
  //   Number(startAccountSum)
  // );
  // const finishAccountSumString: string = formatSumm(
  //   Number(finishAccountSum)
  // );

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
            disabled={isLoading}
          >
            {accounts.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </label>
        {/* 
        <label className={`${styles.label} ${styles['label_sum']}`}>
          Остаток на счете: {startAccountSumString}
        </label> */}

        <label className={styles.label}>
          Счет назначения:
          <select
            name="finishIdAccount"
            onChange={handleChange}
            value={isLoading ? 'Загрузка' : values.finishIdAccount}
            required
            disabled={isLoading}
          >
            {accounts.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </label>
        {/* 
        <label className={`${styles.label} ${styles['label_sum']}`}>
          Остаток на счете: {finishAccountSumString}
        </label> */}

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
          disabled={!isValid || isLoading}
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
