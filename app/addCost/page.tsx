"use client"
import * as categoryApi from "@/app/utils/api/categorys";
import * as costsApi from "@/app/utils/api/costs";
import * as accountsApi from "@/app/utils/api/accounts";
import { Account, Category } from "@/app/lib/definitions";
import { useEffect, useState } from 'react';
import { useFormWithValidation } from "@/app/hooks/useFormWithValidation";
import FormAddCostAndIncome from '../ui/form/form';

export default function Costs() {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [subCategorys, setSubCategorys] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  const getCurrentDateTime = (): string => {
    const now = new Date();
    return now.toISOString()
  }

  const { values, handleChange, resetForm } = useFormWithValidation({
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
      values.subCategoryId = 0
    } catch (e) {
      console.log(e);
    };
  }

  const getAccounts = async () => {
    try {
      const accounts = await accountsApi.getAccountsApi();
      setAccounts(accounts.accounts);
      values.accountId = accounts.accounts[0].id;
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

  return (
    <FormAddCostAndIncome
      handleSubmit={handleSubmit}
      handleChangeCategory={handleChangeCategory}
      categorys={categorys}
      subCategorys={subCategorys}
      accounts={accounts}
      handleChange={handleChange}
      values={values} />
  );
}
