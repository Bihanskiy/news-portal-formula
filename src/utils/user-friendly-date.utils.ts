export const getLocalDayMonthYear = (dateArg: string): string => {
  const date = new Date(dateArg);
  let year: number | string = date.getFullYear();
  let month: number | string = date.getMonth();
  let day: number | string = date.getDay();

  day = day < 10 ? '0' + day : day;

  return `${year}-${month + 1}-${day}`;
};