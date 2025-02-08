'use client';
import { useEffect } from 'react';
import { useFormWithValidation } from '@/app/hooks/useFormWithValidation';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAccounts,
  fetchTransfer,
} from '@/app/lib/store/reducers/accoutSlice';

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
    dispatch(fetchAccounts());
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
