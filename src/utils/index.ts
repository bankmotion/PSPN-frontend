export const randomPosition = (max: number) => Math.floor(Math.random() * max);

export const formatNumberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getShortAddress = (address: string) => {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
