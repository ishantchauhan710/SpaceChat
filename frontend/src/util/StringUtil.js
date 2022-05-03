export const trimString = (str) => {
  if (!str || /^\s*$/.test(str)) {
    return null;
  }

  let trimmedStr = str.replace(/^\s+|\s+$/gm, "");
  return trimmedStr;
};

export const formatForSingleDigit = (value) => {
  if(value<10) {
      return "0" + value.toString();
  } else {
      return value.toString();
  }
}