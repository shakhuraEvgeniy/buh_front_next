'use client';
import { Report } from '../utils/definitions';
import { getReportCostApi, getReportIncomeApi } from '../utils/api/reports';
import TableReport from './tableReport';
import { getCurrentDateTime } from '../utils/getDate';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { useState } from 'react';
import styles from '@/app/ui/addItemForm/addItemForm.module.css';

export default function Reports() {
  const [costReport, setCostReport] = useState<Report>({
    categorys: [],
    sum: '0',
  });
  const [incomeReport, setIncomeReport] = useState<Report>({
    categorys: [],
    sum: '0',
  });
  const { values, handleChange, isValid } = useFormWithValidation({
    startDate: getCurrentDateTime().slice(0, 10),
    stopDate: getCurrentDateTime().slice(0, 10),
  });

  const getCostReport = async (startDate: Date, stopDate: Date) => {
    try {
      const data = await getReportCostApi(startDate, stopDate);
      setCostReport(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getIncomeReport = async (startDate: Date, stopDate: Date) => {
    try {
      const data = await getReportIncomeApi(startDate, stopDate);
      setIncomeReport(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      getCostReport(values.startDate, values.stopDate);
      getIncomeReport(values.startDate, values.stopDate);
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
