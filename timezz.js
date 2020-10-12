/**
 * TimezZ - with this plugin you can easily make a stopwatch or timer.
 *
 * @author Valery Strelets
 * @see https://github.com/BrooonS/TimezZ
 * @license https://github.com/BrooonS/timezz/blob/master/LICENSE
 */

const TIMEZZ = '[TimezZ]';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

const DEFAULT_TEMPLATE = '<span>{NUMBER}<i>{TEXT}</i></span> ';

class Timezz {
  constructor(elements = [], userSettings = {}) {
    this.elements = elements;
    this.settings = {
      date: userSettings.date,
      texts: {
        days: userSettings.texts?.days ?? 'days',
        hours: userSettings.texts?.hours ?? 'hours',
        minutes: userSettings.texts?.minutes ?? 'minutes',
        seconds: userSettings.texts?.seconds ?? 'seconds',
      },
      isStopped: userSettings.isStopped || false,
      canContinue: userSettings.canContinue || false,
      template: userSettings.template || DEFAULT_TEMPLATE,
      beforeCreate: userSettings.beforeCreate || null,
      beforeDestroy: userSettings.beforeDestroy || null,
      update: userSettings.update || null,
    };

    if (typeof this.settings.beforeCreate === 'function') {
      this.settings.beforeCreate(this.settings);
    }

    this.initTimer();
  }

  fixNumber = (math) => {
    const fixZero = (number) => (number >= 10 ? `${number}` : `0${number}`);

    return fixZero(Math.floor(Math.abs(math)));
  }

  initTimer() {
    const countDate = new Date(this.settings.date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;
    const canContinue = this.settings.canContinue || distance > 0;

    const countDays = this.fixNumber(distance / ONE_DAY);
    const countHours = this.fixNumber((distance % ONE_DAY) / ONE_HOUR);
    const countMinutes = this.fixNumber((distance % ONE_HOUR) / ONE_MINUTE);
    const countSeconds = this.fixNumber((distance % ONE_MINUTE) / ONE_SECOND);

    if (typeof this.settings.update === 'function') {
      this.settings.update({
        days: +countDays,
        hours: +countHours,
        minutes: +countMinutes,
        seconds: +countSeconds,
        distance: Math.abs(distance),
      });
    }

    this.elements.forEach((element, index) => {
      this.elements[index].innerHTML = (
        this.formatHTML(canContinue ? countDays : '0', 'days')
        + this.formatHTML(canContinue ? countHours : '0', 'hours')
        + this.formatHTML(canContinue ? countMinutes : '0', 'minutes')
        + this.formatHTML(canContinue ? countSeconds : '0', 'seconds')
      );
    });

    if (!this.settings.isStopped && canContinue) {
      this.timeout = setTimeout(this.initTimer.bind(this), ONE_SECOND);
    }
  }

  formatHTML(number, text) {
    const replace = (string) => string
      .replace(/{NUMBER}/g, number)
      .replace(/{TEXT}/g, this.settings.texts[text]);

    if (typeof this.settings.template === 'object') {
      return replace(this.settings.template[text] ?? DEFAULT_TEMPLATE);
    }

    return replace(this.settings.template);
  }

  destroy() {
    if (typeof this.settings.beforeDestroy === 'function') {
      this.settings.beforeDestroy();
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.elements.forEach((element, index) => {
      this.elements[index].innerHTML = '';
    });
    this.settings = null;
    this.elements = [];
  }
}

const timezz = (selector, userSettings) => {
  const elements = Array.from(document.querySelectorAll(selector));

  if (Number.isNaN(new Date(userSettings.date).getTime())) {
    throw new Error(`${TIMEZZ}: Date isn't valid. Check documentation for more info. https://github.com/BrooonS/timezz`);
  }

  if (elements.length === 0) {
    throw new Error(`${TIMEZZ}: Selector elements not found. Check documentation for more info. https://github.com/BrooonS/timezz`);
  }

  return new Timezz(elements, userSettings);
};

timezz.prototype = Timezz.prototype;

export default timezz;
