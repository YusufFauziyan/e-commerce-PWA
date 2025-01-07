export const formatToTimestamp = (date: string): string => {
  const dateObj = new Date(date);

  return dateObj.toISOString().slice(0, 19).replace("T", " ");
};
