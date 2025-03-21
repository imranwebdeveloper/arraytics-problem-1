export const extractNumber = (text: string) => {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

export const calculatePercentage = (value: number, percent: number) => {
  return (value * percent) / 100;
};
