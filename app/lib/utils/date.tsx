export const getCurrentDateTime = (): string => {
  const now = new Date();
  return now.toISOString();
};

export const formatDate = (dateString: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};
