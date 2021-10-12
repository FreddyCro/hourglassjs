import { checkExpiration, parseTime, getTimezoneDate } from './time';

const LOCALE = Intl.DateTimeFormat().resolvedOptions().timeZone;
let _frequency = 100;
let _callback = undefined;
let _timer = undefined;

const stopCountdown = (time) => {
  time.expired = true;
  _callback ? _callback() : undefined;
  if (_timer) clearInterval(_timer);
};

const updateTime = (time) => {
  time.start = new Date(getTimezoneDate(Date.now(), time.timezone));
  const newTime = parseTime(time.start, time.end, time.timezone);

  time.days = newTime.days;
  time.hours = newTime.hours;
  time.minutes = newTime.minutes;
  time.seconds = newTime.seconds;
};

const countdown = (time) => {
  if (checkExpiration(time.start, time.end)) {
    stopCountdown(time);
  } else {
    _timer = setInterval(() => {
      updateTime(time);

      if (checkExpiration(time.start, time.end)) {
        stopCountdown(time);
      }
    }, _frequency);
  }
};

class Hourglass {
  constructor() {
    this.time = {
      start: new Date(0),
      end: new Date(0),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
      timezone: '',
    };
  }

  set({ end, timezone, frequency, callback }) {
    if (frequency) _frequency = frequency;
    if (callback) _callback = callback;
    if (timezone || LOCALE) this.time.timezone = timezone || LOCALE;

    this.time.start = new Date(getTimezoneDate(Date.now(), this.time.timezone));
    this.time.end = new Date(end);

    return this;
  }

  disable() {
    if (_timer) clearInterval(_timer);
  }

  start() {
    return countdown(this.time);
  }
}

export { Hourglass };
