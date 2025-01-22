"use client"
import { Account, Category } from '@/app/lib/definitions';
import styles from "@/app/ui/addItemForm/addItemForm.module.css"

interface FormAddCostAndIncomeProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categorys: Category[];
  subCategorys: Category[];
  accounts: Account[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: {
    sum: number;
    comment: string;
    categoryId: number;
    subCategoryId: number;
    accountId: number;
    createTime: string;
  };
  isValid: boolean
}

export default function FormAddCostAndIncome({ handleSubmit, handleChangeCategory, categorys, subCategorys, accounts, handleChange, values, isValid }: FormAddCostAndIncomeProps) {
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Дата:
          <input type="date" name='createTime' placeholder="Дата" onChange={handleChange} value={values.createTime} required />
        </label>

        <label className={styles.label}>
          Счет:
          <select name='accountId' onChange={handleChange} required>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Сумма:
          <input type="number" name='sum' placeholder="Сумма" onChange={handleChange} value={values.sum || ""} required />
        </label>

        <label className={styles.label}>
          Категория:
          <select name='categoryId' onChange={handleChangeCategory} value={values.categoryId} required >
            {categorys.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Подкатегория:
          <select name='subCategoryId' onChange={handleChange} required>
            <option key={0} value={0}>Не выбрана</option>
            {subCategorys.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.label} >
          Комментарий:
          <input type="text" name='comment' placeholder="Комментарий" value={values.comment || ""} onChange={handleChange} />
        </label>

        <button className={`${styles['button']} ${isValid || styles["button_disabled"]}`} disabled={!isValid} type="submit">Добавить</button>
        <button className={`${styles.button} ${styles['button_cansel']} `}>Отменить</button>
      </form>
    </>
  );
}