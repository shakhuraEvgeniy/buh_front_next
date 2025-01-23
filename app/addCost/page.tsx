"use client"
import * as categoryApi from "@/app/utils/api/categorys";
import * as costsApi from "@/app/utils/api/costs";
import * as accountsApi from "@/app/utils/api/accounts";
import { Account, Category } from "@/app/lib/definitions";
import { useEffect, useState } from 'react';
import { useFormWithValidation } from "@/app/hooks/useFormWithValidation";
import FormAddCostAndIncome from '../ui/addItemForm/addItemForm';
import { getCurrentDateTime } from '../utils/getDate';
import { useRouter } from 'next/navigation';

export default function AddCosts() {
  const router = useRouter();
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [subCategorys, setSubCategorys] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const { values, handleChange, isValid, resetForm } = useFormWithValidation({
    sum: 0,
    comment: "",
    categoryId: 1,
    subCategoryId: 0,
    accountId: 1,
    createTime: getCurrentDateTime().slice(0, 10),
  });

  useEffect(() => {
    getCategiryCost()
    getAccounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (values.categoryId) {
      getSubCategorysCost(values.categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.categoryId]);

  const getCategiryCost = async () => {
    try {
      const cat = await categoryApi.getCategorysCostApi();
      setCategorys(cat);
    } catch (e) {
      console.log(e);
    };
  }

  const getSubCategorysCost = async (id: number) => {
    try {
      const subCat = await categoryApi.getSubCategorysCostApi(id);
      setSubCategorys(subCat);
    } catch (e) {
      console.log(e);
    };
  }

  const getAccounts = async () => {
    try {
      const accounts = await accountsApi.getAccountsApi();
      setAccounts(accounts.accounts);
    } catch (e) {
      console.log(e);
    };
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createTimeWithTime = new Date(`${values.createTime}T${getCurrentDateTime().slice(11,)}`);
      const subCategoryId = values.subCategoryId === 0 ? null : Number(values.subCategoryId);
      await costsApi.addCostsApi(Number(values.accountId), createTimeWithTime, Number(values.sum), Number(values.categoryId), subCategoryId, values.comment);
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

  const handleChangeCategory = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      handleChange(e);
      await getSubCategorysCost(Number(e.target.value));
    } catch (e) {
      console.log(e);
    };
  }

  const handleCancel = () => {
    router.push('/costs');
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
      title='Добавить расход'
    />
  );
}
