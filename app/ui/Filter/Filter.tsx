import { changeFilter } from '@/app/lib/store/reducers/accountSlice';
import { AppDispatch, RootState } from '@/app/lib/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export default function Filter() {
  const dispatch: AppDispatch = useDispatch();
  const { filter, sort } = useSelector(
    (state: RootState) => state.accounts
  );
  return <select
    name='sortContribution'
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
}