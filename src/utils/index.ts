export const randomPosition = (max: number) => Math.floor(Math.random() * max);

export const formatNumberWithCommas = (number: number) => {
  const [integerPart, fractionalPart] = number.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formattedFractional = fractionalPart
    ? `.${fractionalPart.slice(0, 3)}`
    : "";

  return formattedInteger + formattedFractional;
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
