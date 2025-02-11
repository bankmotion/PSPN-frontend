export const randomPosition = (max: number) => Math.floor(Math.random() * max);

export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
