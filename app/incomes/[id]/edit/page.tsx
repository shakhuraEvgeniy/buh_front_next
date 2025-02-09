'use client';
import { useFormWithValidation } from '@/app/hooks/useFormWithValidation';
import { fetchAccounts } from '@/app/lib/store/reducers/accoutSlice';
import {
  fetchCategorysIncome,
  fetchSubCategorysIncome,
} from '@/app/lib/store/reducers/incomeCategorySlice';
import {
  fetchDeleteIncome,
  fetchUpdateIncome,
} from '@/app/lib/store/reducers/incomesSlice';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import FormAddCostAndIncome from '@/app/ui/addItemForm/addItemForm';
import { getCurrentDateTime } from '@/app/utils/getDate';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';

interface Params {
  id: string;
}

export default function EditIncomePage({
  params,
}: {
  params: React.Usable<Params>;
}) {
  const { id } = React.use<Params>(params);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { incomes } = useSelector((state: RootState) => state.incomes);
  const startValues = incomes.find((item) => item.id === Number(id));
  const { categorys, subCategorys } = useSelector(
    (state: RootState) => state.categoryIncome
  );
  const { accounts } = useSelector((state: RootState) => state.accounts);
  console.log('startValues', startValues);

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
    dispatch(fetchAccounts());
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
        values.subCategoryId === '0' ? null : Number(values.subCategoryId);
      await dispatch(
        fetchUpdateIncome({
          incomeId: Number(values.incomeId),
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
    console.log('delete');

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
