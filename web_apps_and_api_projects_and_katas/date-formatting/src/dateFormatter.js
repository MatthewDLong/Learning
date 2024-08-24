import { differenceInDays } from "date-fns";

export const formatDateTime = (
  dateToFormatTimeMillis,
  systemDateTimeMillis,
  locale = "en-GB",
  dateStyle = "short",
  timeStyle
) => {
  if (
    !dateToFormatTimeMillis ||
    typeof dateToFormatTimeMillis !== "number" ||
    !systemDateTimeMillis ||
    typeof systemDateTimeMillis !== "number"
  ) {
    return "";
  }
  const dateToFormat = new Date(dateToFormatTimeMillis);
  const systemDate = new Date(systemDateTimeMillis);

  const daysDiff = differenceInDays(systemDate, dateToFormat);

  if (daysDiff === 0) {
    return "TODAY";
  } else if (daysDiff === 1) {
    return "YESTERDAY";
  }

  const formatter = Intl.DateTimeFormat(locale, { dateStyle, timeStyle });

  return formatter.format(dateToFormat);
};
