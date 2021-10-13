import { checkExpiration, parseTime, formatTime } from './time';

let _frequency = 100;
let _callback = undefined;
let _timer = undefined;

const stopCountdown = (time) => {
  time.expired = true;
  _callback ? _callback() : undefined;
  if (_timer) clearInterval(_timer);
};

const updateTime = (time) => {
  time.start = new Date(Date.now());
  const newTime = parseTime(time.start, time.end);

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
      foramtedStart: new Date(0),
      formatedEnd: new Date(0),
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: false,
    };
  }

  set({ end, frequency, format, callback }) {
    if (frequency) _frequency = frequency;
    if (callback) _callback = callback;

    this.time.start = new Date(Date.now());
    this.time.end = new Date(end);

    if (format) {
      this.time.foramtedStart = formatTime(this.time.start, format);
      this.time.formatedEnd = formatTime(end, format);
    }

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
