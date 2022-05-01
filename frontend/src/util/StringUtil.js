export const trimString = (str) => {
  if (!str || /^\s*$/.test(str)) {
    return null;
  }

  let trimmedStr = str.replace(/^\s+|\s+$/gm, "");
  return trimmedStr;
};
