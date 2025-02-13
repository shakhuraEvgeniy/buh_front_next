import { changeFilter } from '@/app/lib/store/reducers/accountSlice';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';

export default function Filter() {
  const dispatch: AppDispatch = useDispatch();
  const { filter, sort } = useSelector((state: RootState) => state.accounts);
  return (
    <label className={styles.label}>
      Фильтр счетов:
      <select
        name="sortContribution"
        onChange={(e) => dispatch(changeFilter({ sort: e.target.value }))}
        value={sort}
        required
      >
        {filter.map((item) => (
          <option key={item.name} value={item.name}>
            {item.value}
          </option>
        ))}
      </select>
    </label>
  );
}
