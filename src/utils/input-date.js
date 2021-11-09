import { verifyInputDateFormat, verifyInputDateRange } from './verification';

const inputDate = (date) => {
  if (!verifyInputDateFormat(date)) return new Date(0);
  if (!verifyInputDateRange(date)) return new Date(0);

  return new Date(date);
};

export { inputDate };
