'use client';
import { useEffect, useState } from 'react';
import FormAddCostAndIncome from '../../ui/addItemForm/addItemForm';
import { Account, Category } from '../../lib/definitions';
import * as accountsApi from "@/app/utils/api/accounts";
import * as incomesApi from "@/app/utils/api/incomes";
import * as categoryApi from "@/app/utils/api/categorys";
import { useFormWithValidation } from '@/app/hooks/useFormWithValidation';
import { getCurrentDateTime } from '@/app/utils/getDate';
import { useRouter } from 'next/navigation';

export default function AddIncome() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [subCategorys, setSubCategorys] = useState<Category[]>([]);

  const { values, handleChange, isValid, resetForm } = useFormWithValidation({
    sum: 0,
    comment: "",
    categoryId: 1,
    subCategoryId: 0,
    accountId: 1,
    createTime: getCurrentDateTime().slice(0, 10),
  });

  useEffect(() => {
    getCategiryIncome()
    getAccounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (values.categoryId) {
      getSubCategorysIncome(values.categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.categoryId]);

  const getAccounts = async () => {
    try {
      const accounts = await accountsApi.getAccountsApi();
      setAccounts(accounts.accounts);
    } catch (e) {
      console.log(e);
    };
  }

  const getCategiryIncome = async () => {
    try {
      const cat = await categoryApi.getCategorysIncomeApi();
      setCategorys(cat);
    } catch (e) {
      console.log(e);
    };
  }

  const getSubCategorysIncome = async (id: number) => {
    try {
      const subCat = await categoryApi.getSubCategorysIncomeApi(id);
      setSubCategorys(subCat);
      values.subCategoryId = 0;
    } catch (e) {
      console.log(e);
    };
  }

  const handleChangeCategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      handleChange(e);
      await getSubCategorysIncome(Number(e.target.value));
    } catch (e) {
      console.log(e);
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createTimeWithTime = new Date(`${values.createTime}T${getCurrentDateTime().slice(11,)}`);
      const subCategoryId = values.subCategoryId === 0 ? null : Number(values.subCategoryId);
      await incomesApi.addIncomeApi(Number(values.accountId), createTimeWithTime, Number(values.sum), Number(values.categoryId), subCategoryId, values.comment);
      resetForm({
        sum: 0,
        comment: "",
        categoryId: values.categoryId,
        subCategoryId: values.subCategoryId,
        accountId: values.accountId,
        createTime: values.createTime,
      })

    } catch (e) {
      console.log(e);
    };
  }

  const handleCancel = () => {
    router.push('/incomes');
  }

  return (
    <FormAddCostAndIncome
      handleSubmit={handleSubmit}
      handleChangeCategory={handleChangeCategory}
      categorys={categorys}
      subCategorys={subCategorys}
      accounts={accounts}
      handleChange={handleChange}
      handleCancel={handleCancel}
      values={values}
      isValid={isValid}
      title='Добавить доход' />

  );
}