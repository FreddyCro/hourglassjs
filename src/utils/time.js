const checkExpiration = (start, end) => {
  return start >= end;
};

const parseTime = (start, end) => {
  const distance = end.getTime() - start.getTime();
  console.log(start, end);
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

const getDateWithDiff = (date, tz, origin = false) => {
  const LOCALE_ORIGIN = new Date(
    new Date().toLocaleString('en-Us', { timeZone: tz })
  );
  return (
    new Date(date).getTime() +
    (LOCALE_ORIGIN.getHours() -
      (origin ? new Date().getUTCHours() : new Date().getHours())) *
      1000 *
      60 *
      60
  );
};

export { checkExpiration, parseTime, getDateWithDiff };
