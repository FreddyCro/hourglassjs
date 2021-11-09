const verifyInputDateFormat = (date) => {
  try {
    if (date.split('T').length > 2) {
      console.error(
        'Invalid date pass. It should be like "2021-11-15T00:00:00+08:00"'
      );
      return false;
    }

    const [strDate, strTime] = date.split('T');

    if (!/^(2)\d{3}-\d{2}-\d{2}$/.test(strDate)) {
      console.error('Invalid date pass.');
      return false;
    }

    if (!/^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/.test(strTime)) {
      console.error('Invalid time pass.');
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const verifyInputDateRange = (date) => {
  if (Date.now() < new Date(date)) {
    return true;
  } else {
    console.error('The input time should be later than the current time.');
    return false;
  }
};

export { verifyInputDateFormat, verifyInputDateRange };
