'use client';
import { useEffect } from 'react';
import { useFormWithValidation } from '@/app/lib/hooks/useFormWithValidation';
import FormAddCostAndIncome from '@/app/ui/addItemForm/addItemForm';
import { getCurrentDateTime } from '@/app/lib/utils/getDate';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '@/app/lib/store/api/accounts';
import {
  fetchCategorysCost,
  fetchSubCategorysCost,
} from '@/app/lib/store/api/categorys';
import { fetchAddCost } from '@/app/lib/store/api/costs';

export default function AddCosts() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { categorys, subCategorys } = useSelector(
    (state: RootState) => state.categoryCost
  );
  const { accounts } = useSelector((state: RootState) => state.accounts);
  const { isLoading } = useSelector((state: RootState) => state.costs);

  const { values, setValue, handleChange, isValid, resetForm } =
    useFormWithValidation({
      sum: 0,
      comment: '',
      categoryId: 1,
      subCategoryId: 0,
      accountId: 1,
      createTime: getCurrentDateTime().slice(0, 10),
    });

  useEffect(() => {
    dispatch(fetchCategorysCost());
    dispatch(fetchAccounts('all'));
  }, [dispatch]);

  useEffect(() => {
    if (values.categoryId) {
      dispatch(fetchSubCategorysCost(values.categoryId));
      setValue('subCategoryId', 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, values.categoryId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createTimeWithTime = new Date(
        `${values.createTime}T${getCurrentDateTime().slice(11)}`
      );
      const subCategoryId =
        values.subCategoryId === 0 ? null : Number(values.subCategoryId);
      await dispatch(
        fetchAddCost({
          accountId: Number(values.accountId),
          sum: Number(values.sum),
          categoryId: Number(values.categoryId),
          subCategoryId: subCategoryId,
          comment: values.comment,
          createTime: createTimeWithTime,
        })
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

  const handleChangeCategory = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      handleChange(e);
      await dispatch(fetchSubCategorysCost(Number(e.target.value)));
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/costs');
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
      title="Добавить расход"
      submitName="Добавить"
      isLoading={isLoading}
    />
  );
}
