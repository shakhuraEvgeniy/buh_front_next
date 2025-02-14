'use client';
import React, { use, useEffect } from 'react';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import FormAddCostAndIncome from '@/app/ui/addItemForm/addItemForm';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDateTime } from '@/app/utils/getDate';
import { useFormWithValidation } from '@/app/hooks/useFormWithValidation';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { fetchAccounts } from '@/app/lib/store/api/accounts';
import {
  fetchCategorysCost,
  fetchSubCategorysCost,
} from '@/app/lib/store/api/categorys';
import { fetchDeleteCost, fetchUpdateCost } from '@/app/lib/store/api/costs';

type Params = Promise<{ id: string }>;

export default function EditCostPage(props: { params: Params }) {
  const { id } = use(props.params);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { costs, isLoading } = useSelector((state: RootState) => state.costs);
  const { categorys, subCategorys } = useSelector(
    (state: RootState) => state.categoryCost
  );
  const { accounts } = useSelector((state: RootState) => state.accounts);
  const startValues = costs.find((item) => item.id === Number(id));

  const { values, setValue, handleChange, isValid } = useFormWithValidation({
    sum: startValues?.sum || 0,
    comment: startValues?.comment || '',
    categoryId: startValues?.categoryid || 1,
    subCategoryId: startValues?.subcategoryid || 0,
    accountId: startValues?.accountid || 1,
    createTime:
      String(startValues?.create_time).slice(0, 10) ||
      getCurrentDateTime().slice(0, 10),
  });

  useEffect(() => {
    dispatch(fetchCategorysCost());
    dispatch(fetchAccounts('all'));
    if (values.categoryId > 0) {
      dispatch(fetchSubCategorysCost(Number(values.categoryId)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (values.categoryId > 0) {
      dispatch(fetchSubCategorysCost(values.categoryId));
      if (values.categoryId !== startValues?.categoryid) {
        setValue('subCategoryId', 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, values.categoryId]);

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
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createTimeWithTime = new Date(
        `${values.createTime}T${getCurrentDateTime().slice(11)}`
      );
      const subCategoryId =
        Number(values.subCategoryId) === 0
          ? null
          : Number(values.subCategoryId);
      await dispatch(
        fetchUpdateCost({
          costId: Number(id),
          accountId: Number(values.accountId),
          sum: Number(values.sum),
          categoryId: Number(values.categoryId),
          subCategoryId,
          comment: values.comment,
          createTime: createTimeWithTime,
        })
      );
      router.back();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(fetchDeleteCost(Number(id)));
      router.back();
    } catch (e) {
      console.log(e);
    }
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
      title="Изменение расхода"
      submitName="Изменить"
      isLoading={isLoading}
    >
      <button
        className={`${styles.button} ${styles['button_delete']}`}
        onClick={(event) => handleDelete(event)}
      >
        Удалить
      </button>
    </FormAddCostAndIncome>
  );
}
