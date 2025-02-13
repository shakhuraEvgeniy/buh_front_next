import { IAccountFilters } from '../../store/models/IAccount';

export const sortType: IAccountFilters[] = [
  { name: 'all', value: 'Все' },
  { name: 'contribution', value: 'Вклады' },
  { name: 'notContribution', value: 'Счета' },
];
