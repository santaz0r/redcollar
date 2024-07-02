export const transformToTimeISO = (date, time) => {
  const [day, month, year] = date.split('.');
  const formattedDate = `${year}-${month}-${day}`;
  const dateTimeISO = `${formattedDate}T${time}:00.000Z`;
  return dateTimeISO;
};
