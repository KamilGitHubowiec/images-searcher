export const convertDateToYearAndMonth = (date: any) => {
  const fullDate = new Date(date);
  const year = fullDate.getFullYear();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(fullDate);

  return `${year} ${month}`
}
