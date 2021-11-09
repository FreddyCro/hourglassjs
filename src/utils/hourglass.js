import { checkExpiration, parseTime, formatTime } from './time';
import { inputDate } from './input-date';

let privateFrequency = 100;
let privateCallback = undefined;
let privateTimer = undefined;
let privateDoUpdate = undefined;

const stopCountdown = (time) => {
  time.expired = true;
  privateCallback ? privateCallback() : undefined;
  if (privateTimer) clearInterval(privateTimer);
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
    privateTimer = setInterval(() => {
      updateTime(time);
      privateDoUpdate();

      if (checkExpiration(time.start, time.end)) {
        stopCountdown(time);
      }
    }, privateFrequency);
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

    this.callback = undefined;
  }

  set({ start, end, frequency, textFormat, callback, doUpdate }) {
    if (!end) return console.error('Missing input "end" parameter.');
    if (frequency) privateFrequency = frequency;
    if (callback) privateCallback = callback;
    if (doUpdate) privateDoUpdate = doUpdate;

    this.time.start = start ? inputDate(start) : Date.now();
    this.time.end = inputDate(end);

    if (textFormat) {
      this.time.foramtedStart = formatTime(this.time.start, textFormat);
      this.time.formatedEnd = formatTime(end, textFormat);
    }

    return this;
  }

  disable() {
    if (privateTimer) clearInterval(privateTimer);
  }

  start() {
    return countdown(this.time);
  }
}

export { Hourglass };
