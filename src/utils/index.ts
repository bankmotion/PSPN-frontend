export const randomPosition = (max: number) => Math.floor(Math.random() * max);

export const formatNumberWithCommas = (number: number, floor: number = 3) => {
  const [integerPart, fractionalPart] = number.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formattedFractional = fractionalPart
    ? `${floor === 0 ? "" : "."}${fractionalPart.slice(0, floor)}`
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

export const remainTime = (time: number) => {
  if (time < 0) {
    return "00:00:00";
  }
  let timeInt = Math.floor(time);
  const days = Math.floor(timeInt / (24 * 3600));
  timeInt = timeInt % (24 * 3600);
  const hoursStr = timerFormatStr(Math.floor(timeInt / 3600));
  timeInt = timeInt % 3600;
  const minsStr = timerFormatStr(Math.floor(timeInt / 60));
  timeInt = timeInt % 60;
  const secsStr = timerFormatStr(timeInt % 60);

  return days === 0
    ? `${hoursStr}:${minsStr}:${secsStr}`
    : `${days} days, ${hoursStr} : ${minsStr} : ${secsStr}`;
};

export const timerFormatStr = (digit: number) => {
  if (digit === 0) return "00";
  return digit < 10 ? `0${digit}` : digit;
};

export const getPSTTimeFromTimestamp = (timestamp: number) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles", // PST (Pacific Standard Time) zone
  };

  const date = new Date(timestamp * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);
  return formattedDate;
};

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
};
