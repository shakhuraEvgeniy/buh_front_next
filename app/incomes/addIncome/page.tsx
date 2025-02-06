'use client';
import { useEffect } from 'react';
import FormAddCostAndIncome from '../../ui/addItemForm/addItemForm';
import { useFormWithValidation } from '@/app/hooks/useFormWithValidation';
import { getCurrentDateTime } from '@/app/utils/getDate';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { fetchAccounts } from '@/app/lib/store/reducers/accoutSlice';
import { fetchCategorysIncome, fetchSubCategorysIncome } from '@/app/lib/store/reducers/incomeCategorySlice';
import { fetchAddIncome } from '@/app/lib/store/reducers/incomes';
import { useDispatch, useSelector } from 'react-redux';

export default function AddIncome() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { categorys, subCategorys } = useSelector((state: RootState) => state.categoryIncome);
  const { accounts } = useSelector((state: RootState) => state.accounts);

  const { values, setValue, handleChange, isValid, resetForm } = useFormWithValidation({
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
      setValue("subCategoryId", 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      await dispatch(fetchAddIncome({
        accountId: Number(values.accountId),
        createTime: createTimeWithTime,
        sum: Number(values.sum),
        categoryId: Number(values.categoryId),
        subCategoryId: subCategoryId,
        comment: values.comment
      }));
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
