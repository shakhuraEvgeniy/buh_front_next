'use client';
import { useFormWithValidation } from '@/app/lib/hooks/useFormWithValidation';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import FormAddCostAndIncome from '@/app/ui/addItemForm/addItemForm';
import { getCurrentDateTime } from '@/app/lib/utils/date';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { fetchAccounts } from '@/app/lib/store/api/accounts';
import {
  fetchCategorysIncome,
  fetchSubCategorysIncome,
} from '@/app/lib/store/api/categorys';
import {
  fetchDeleteIncome,
  fetchUpdateIncome,
} from '@/app/lib/store/api/incomes';

type Params = Promise<{ id: string }>;

export default function EditIncomePage(props: { params: Params }) {
  const { id } = use(props.params);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { incomes, isLoading } = useSelector(
    (state: RootState) => state.incomes
  );
  const startValues = incomes.find((item) => item.id === Number(id));
  const { categorys, subCategorys } = useSelector(
    (state: RootState) => state.categoryIncome
  );
  const { accounts } = useSelector((state: RootState) => state.accounts);

  const { values, setValue, handleChange, isValid } = useFormWithValidation({
    sum: startValues?.sum || 0,
    comment: startValues?.comment || '',
    accountId: startValues?.accountid || 1,
    categoryId: startValues?.categoryid || 1,
    subCategoryId: startValues?.subcategoryid || 0,
    createTime:
      String(startValues?.create_time).slice(0, 10) ||
      getCurrentDateTime().slice(0, 10),
  });

  useEffect(() => {
    dispatch(fetchCategorysIncome());
    dispatch(fetchAccounts('all'));
    if (values.categoryId > 0) {
      dispatch(fetchSubCategorysIncome(Number(values.categoryId)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (values.categoryId > 0) {
      dispatch(fetchSubCategorysIncome(values.categoryId));
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
      await dispatch(fetchSubCategorysIncome(Number(e.target.value)));
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
        fetchUpdateIncome({
          incomeId: Number(id),
          accountId: Number(values.accountId),
          createTime: createTimeWithTime,
          sum: Number(values.sum),
          categoryId: Number(values.categoryId),
          subCategoryId,
          comment: values.comment,
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
      await dispatch(fetchDeleteIncome(Number(id)));
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
      title="Изменение дохода"
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
