import { formatForSingleDigit } from "./StringUtil";

export const formatDate = (date) => {
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();


  return `${formatForSingleDigit(day)} ${monthList[month+1]} ${year}, ${formatForSingleDigit(hour)}:${formatForSingleDigit(minute)}`;
};
