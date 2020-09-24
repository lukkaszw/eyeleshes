export const printDate = (dateString, language) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(language).format(date);
}