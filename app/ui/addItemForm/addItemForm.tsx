'use client';
import { IAccount } from '@/app/lib/store/models/IAccount';
import { ICategory } from '@/app/lib/store/models/ICategory';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import LoaderButton from '../loaders/Loader__button';

interface FormAddCostAndIncomeProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categorys: ICategory[];
  subCategorys: ICategory[];
  accounts: IAccount[];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  values: {
    sum: number;
    comment: string;
    categoryId: number;
    subCategoryId: number;
    accountId: number;
    createTime: string;
  };
  isValid: boolean;
  title: string;
  handleCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  submitName: string;
  isLoading: boolean;
  children?: React.ReactNode;
}

export default function FormAddCostAndIncome({
  handleSubmit,
  handleChangeCategory,
  categorys,
  subCategorys,
  accounts,
  handleChange,
  handleCancel,
  values,
  isValid,
  title,
  submitName,
  isLoading,
  children,
}: FormAddCostAndIncomeProps) {
  return (
    <div className={styles.form}>
      <h2 className={styles.title}>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Дата:
          <input
            type="date"
            name="createTime"
            placeholder="Дата"
            onChange={handleChange}
            value={values.createTime}
            required
          />
        </label>

        <label className={styles.label}>
          Счет:
          <select
            name="accountId"
            onChange={handleChange}
            value={values.accountId}
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

        <label className={styles.label}>
          Категория:
          <select
            name="categoryId"
            onChange={handleChangeCategory}
            value={values.categoryId}
            required
          >
            {categorys.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Подкатегория:
          <select
            name="subCategoryId"
            onChange={handleChange}
            value={values.subCategoryId}
            required
          >
            <option key={0} value={0}>
              Не выбрана
            </option>
            {subCategorys.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Комментарий:
          <input
            type="text"
            name="comment"
            placeholder="Комментарий"
            value={values.comment || ''}
            onChange={handleChange}
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
        <div>{children}</div>
      </form>
    </div>
  );
}
