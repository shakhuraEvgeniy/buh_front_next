'use client';
import { useEffect } from 'react';
import FormAddCostAndIncome from '../../ui/addItemForm/addItemForm';
import * as incomesApi from '@/app/utils/api/incomes';
import { useFormWithValidation } from '@/app/hooks/useFormWithValidation';
import { getCurrentDateTime } from '@/app/utils/getDate';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { useDispatch } from 'react-redux';
import { fetchAccounts } from '@/app/lib/store/reducers/accoutSlice';
import { fetchCategorysIncome, fetchSubCategorysIncome } from '@/app/lib/store/reducers/incomeCategorySlice';
import { useSelector } from 'react-redux';

export default function AddIncome() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { categorys, subCategorys } = useSelector((state: RootState) => state.categoryIncome);
  const { accounts } = useSelector((state: RootState) => state.accounts);

  const { values, handleChange, isValid, resetForm } = useFormWithValidation({
    sum: 0,
    comment: '',
    categoryId: 1,
    subCategoryId: 0,
    accountId: 1,
    createTime: getCurrentDateTime().slice(0, 10),
  });

  useEffect(() => {
    dispatch(fetchCategorysIncome())
    dispatch(fetchAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (values.categoryId) {
      dispatch(fetchSubCategorysIncome(values.categoryId));
    }
  }, [dispatch, values.categoryId]);


  const handleChangeCategory = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      handleChange(e);
      await dispatch(fetchSubCategorysIncome(Number(e.target.value)));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createTimeWithTime = new Date(
        `${values.createTime}T${getCurrentDateTime().slice(11)}`
      );
      const subCategoryId =
        values.subCategoryId === 0 ? null : Number(values.subCategoryId);
      await incomesApi.addIncomeApi(
        Number(values.accountId),
        createTimeWithTime,
        Number(values.sum),
        Number(values.categoryId),
        subCategoryId,
        values.comment
      );
      resetForm({
        sum: 0,
        comment: '',
        categoryId: values.categoryId,
        subCategoryId: values.subCategoryId,
        accountId: values.accountId,
        createTime: values.createTime,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    router.push('/incomes');
  };

  return (
    <FormAddCostAndIncome
      handleSubmit={handleSubmit}
      handleChangeCategory={handleChangeCategory}
      categorys={categorys}
      subCategorys={subCategorys}
      accounts={accounts.accounts}
      handleChange={handleChange}
      handleCancel={handleCancel}
      values={values}
      isValid={isValid}
      title="Добавить доход"
    />
  );
}
