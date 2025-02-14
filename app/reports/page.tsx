'use client';
import TableReport from './tableReport';
import { getCurrentDateTime } from '../lib/utils/getDate';
import { useFormWithValidation } from '../lib/hooks/useFormWithValidation';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';
import { AppDispatch, RootState } from '../lib/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCostReport, fetchIncomeReport } from '../lib/store/api/reports';

export default function Reports() {
  const dispatch: AppDispatch = useDispatch();
  const { incomeReport, costReport } = useSelector(
    (state: RootState) => state.reports
  );

  const { values, handleChange, isValid } = useFormWithValidation({
    startDate: getCurrentDateTime().slice(0, 10),
    stopDate: getCurrentDateTime().slice(0, 10),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(
        fetchCostReport({
          startDate: values.startDate,
          stopDate: values.stopDate,
        })
      );
      dispatch(
        fetchIncomeReport({
          startDate: values.startDate,
          stopDate: values.stopDate,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Начало периода:
            <input
              type="date"
              name="startDate"
              value={values.start}
              onChange={handleChange}
              required
            />
          </label>

          <label className={styles.label}>
            Конец периода:
            <input
              type="date"
              name="stopDate"
              value={values.end}
              onChange={handleChange}
              required
            />
          </label>

          <button
            className={`${styles['button']} ${isValid || styles['button_disabled']}`}
            disabled={!isValid}
            type="submit"
          >
            Получить отчет
          </button>
        </form>
      </div>

      <TableReport data={incomeReport} title="Доходы" />
      <TableReport data={costReport} title="Расходы" />
    </>
  );
}
