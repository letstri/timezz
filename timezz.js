/**
 * TimezZ - is a simple timer plugin for countdown and count forward.
 *
 * @author Valery Strelets
 * @see https://github.com/BrooonS/TimezZ
 * @license https://github.com/BrooonS/timezz/blob/master/LICENSE
 */

import { version } from './package';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export default class TimezZ {
  constructor(selector, userSettings = {}) {
    this.VERSION = version;
    this.element = document.querySelector(selector);
    this.settings = {
      date: null,
      isStopped: false,
      canContinue: false,
      template: '<span>NUMBER<i>LETTER</i></span> ',
      beforeCreate() {},
      beforeDestroy() {},
      finished() {},
      ...userSettings,
      text: {
        days: 'd',
        hours: 'h',
        minutes: 'm',
        seconds: 's',
        ...userSettings.text,
      },
    };

    this.validate();
    this.initTimer();
  }

  initTimer() {
    const calculateTemplate = (math) => {
      const fixNumber = number => (number >= 10 ? number : `0${number}`);

      return fixNumber(Math.floor(Math.abs(math)));
    };

    const countDate = new Date(this.settings.date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;
    const canContinue = this.settings.canContinue || distance > 0;

    /**
     * Hard math.
     */
    const countDays = calculateTemplate(distance / ONE_DAY);
    const countHours = calculateTemplate((distance % ONE_DAY) / ONE_HOUR);
    const countMinutes = calculateTemplate((distance % ONE_HOUR) / ONE_MINUTE);
    const countSeconds = calculateTemplate((distance % ONE_MINUTE) / ONE_SECOND);

    if (typeof this.settings.beforeCreate === 'function') {
      this.settings.beforeCreate();
    }

    if (typeof this.settings.finished === 'function' && !canContinue) {
      this.settings.finished();
    }

    this.element.innerHTML = (
      this.outputTemplate(canContinue ? countDays : 0, 'days')
      + this.outputTemplate(canContinue ? countHours : 0, 'hours')
      + this.outputTemplate(canContinue ? countMinutes : 0, 'minutes')
      + this.outputTemplate(canContinue ? countSeconds : 0, 'seconds')
    );

    if (!this.settings.isStopped && canContinue) {
      this.timeout = setTimeout(this.initTimer.bind(this), ONE_SECOND);
    }
  }

  outputTemplate(number, letter) {
    return this.settings.template
      .replace(/NUMBER/g, number)
      .replace(/LETTER/g, this.settings.text[letter]);
  }

  validate() {
    /* eslint-disable no-console */
    if (this.element === null) {
      console.error('[TimezZ]: Selector isn\'t passed. Check documentation for more info. https://github.com/BrooonS/timezz');
    }

    if (Number.isNaN(new Date(this.settings.date).getTime())) {
      console.warn('[TimezZ]: Date isn\'t valid. Check documentation for more info. https://github.com/BrooonS/timezz');
    }
    /* eslint-enable no-console */
  }

  destroy() {
    if (typeof this.settings.beforeDestroy === 'function') {
      this.settings.beforeDestroy();
    }

    clearTimeout(this.timeout);
    this.element.innerHTML = null;
    this.settings = {};
    this.element = null;
  }
}
