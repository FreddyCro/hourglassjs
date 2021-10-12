const checkExpiration = (start, end) => {
  return start >= end;
};

const parseTime = (start, end) => {
  const distance = end.getTime() - start.getTime();

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

const getTimezoneDate = (date, tz) =>
  new Date(new Date(date).toLocaleString('en-Us', { timeZone: tz }));

export { checkExpiration, parseTime, getTimezoneDate };
