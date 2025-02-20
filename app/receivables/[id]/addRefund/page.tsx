'use client';
import { useFormWithValidation } from '@/app/lib/hooks/useFormWithValidation';
import { fetchAddRufund } from '@/app/lib/store/api/receivables';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { getCurrentDateTime } from '@/app/lib/utils/date';
import FormRefunds from '@/app/ui/FormRefunds/FormRefunds';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

type Params = Promise<{ id: string }>;

export default function AddRefund(props: { params: Params }) {
  const { id } = use(props.params);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { receivables, isLoading } = useSelector(
    (state: RootState) => state.receivables
  );
  const currentReceivable = receivables.find((item) => item.id === Number(id));
  const remainder = currentReceivable
    ? currentReceivable.amount_of_debt - currentReceivable.funds_repaid
    : 0;

  const { values, handleChange, isValid, setValue } = useFormWithValidation({
    sum: 0,
    accountId: 1,
    create_time: getCurrentDateTime().slice(0, 10),
    isDebtRepaid: false,
  });

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createTimeWithTime = new Date(
        `${values.create_time}T${getCurrentDateTime().slice(11)}`
      );
      await dispatch(
        fetchAddRufund({
          createTime: createTimeWithTime,
          receivableId: Number(id),
          sum: Number(values.sum),
          accountId: Number(values.accountId),
          debtRepaid: values.isDebtRepaid,
        })
      );
      router.back();
    } catch (e) {
      console.log(e);
    }
  };

  const handleToggleChange = () => {
    setValue('isDebtRepaid', !values.isDebtRepaid);
  };

  return (
    <FormRefunds
      title={`Добавление возврата к долгу`}
      submitName="Добавить возврат"
      handleCancel={handleCancel}
      handleChange={handleChange}
      values={values}
      isValid={isValid}
      handleSubmit={handleSubmit}
      currentReceivable={currentReceivable}
      remainder={remainder}
      isLoading={isLoading}
      handleToggleChange={handleToggleChange}
    ></FormRefunds>
  );
}
