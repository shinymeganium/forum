export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const truncateText = (
  text: string, maxLenght: number) => {
  if (text.length <= maxLenght)
    return text;

  return text.slice(0, maxLenght) + "...";
}