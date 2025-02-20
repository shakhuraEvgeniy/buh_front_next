export const formatSumm = (number: number) => {
  return number.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });
};
