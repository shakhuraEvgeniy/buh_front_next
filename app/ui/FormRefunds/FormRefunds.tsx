'use client';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { useSelector } from 'react-redux';
import LoaderButton from '../loaders/Loader__button';
import { IReceivable } from '@/app/lib/store/models/IReceivables';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAccounts } from '@/app/lib/store/api/accounts';

interface IFormRefundsProps {
  title: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  isLoading: boolean;
  values: {
    create_time: string;
    sum: number;
    accountId: number;
    isDebtRepaid: boolean;
  };
  submitName: string;
  handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentReceivable?: IReceivable;
  remainder: number;
  handleToggleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormRefunds({
  handleToggleChange,
  currentReceivable,
  title,
  handleChange,
  handleSubmit,
  values,
  isValid,
  isLoading,
  submitName,
  handleCancel,
  remainder,
}: IFormRefundsProps) {
  const dispatch: AppDispatch = useDispatch();

  const { accounts } = useSelector((state: RootState) => state.accounts);

  useEffect(() => {
    dispatch(fetchAccounts('all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>
        {title} {currentReceivable?.debtor}
      </h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Дата:
          <input
            type="date"
            name="createTime"
            placeholder="Дата"
            onChange={handleChange}
            value={values.create_time}
            required
          />
        </label>

        <label className={styles.label}>
          Вернуть на счет:
          <select
            name="accountId"
            onChange={handleChange}
            value={values.accountId}
            required
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
        <label className={styles.label}>Остаток долга: {remainder}</label>

        <label className={styles.label}>
          Долг погашен:
          <input
            type="checkbox"
            name="isDebtRepaid"
            checked={values.isDebtRepaid}
            onChange={handleToggleChange}
          />
        </label>
        <button
          className={`${styles['button']} ${isValid || styles['button_disabled']}`}
          disabled={!isValid}
          type="submit"
        >
          {isLoading ? <LoaderButton /> : submitName}
        </button>
        <button
          className={`${styles.button} ${styles['button_cansel']}`}
          onClick={(event) => handleCancel(event)}
        >
          Отменить
        </button>
      </form>
    </div>
  );
}
