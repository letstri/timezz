/**
 * TimezZ - with this plugin you can easily make a stopwatch or timer.
 *
 * @author Valery Strelets
 * @see https://github.com/BrooonS/TimezZ
 * @license https://github.com/BrooonS/timezz/blob/master/LICENSE
 */

import { version } from './package.json';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export default class TimezZ {
  constructor(selector, userSettings = {}) {
    this.VERSION = version;
    this.elements = Array.from(document.querySelectorAll(selector));

    this.validateDate(userSettings.date);
    this.validateElements(this.elements);

    this.settings = {
      date: userSettings.date,
      isStopped: userSettings.isStopped || false,
      canContinue: userSettings.canContinue || false,
      template: userSettings.template || '<span>NUMBER<i>LETTER</i></span> ',
      beforeCreate: userSettings.beforeCreate || (() => {}),
      beforeDestroy: userSettings.beforeDestroy || (() => {}),
      update: userSettings.update || (() => {}),
    };

    if (typeof this.settings?.beforeCreate === 'function') {
      this.settings.beforeCreate();
    }

    this.initTimer();
  }

  initTimer() {
    const calculateTemplate = (math) => {
      const fixNumber = (number) => (number >= 10 ? `${number}` : `0${number}`);

      return fixNumber(Math.floor(Math.abs(math)));
    };

    const countDate = new Date(this.settings.date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;
    const canContinue = this.settings.canContinue || distance > 0;

    const countDays = calculateTemplate(distance / ONE_DAY);
    const countHours = calculateTemplate((distance % ONE_DAY) / ONE_HOUR);
    const countMinutes = calculateTemplate((distance % ONE_HOUR) / ONE_MINUTE);
    const countSeconds = calculateTemplate((distance % ONE_MINUTE) / ONE_SECOND);

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

  formatHTML(number, letter) {
    const replace = (string) => string
      .replace(/NUMBER/g, number)
      .replace(/LETTER/g, letter);

    if (!this.settings) {
      return '';
    }

    if (typeof this.settings.template === 'string') {
      return replace(this.settings.template);
    }

    if (typeof this.settings.template === 'object') {
      return Object.keys(this.settings.template)
        .reduce((acc, key) => acc + replace(this.settings?.template[key]), '');
    }

    return '';
  }

  validateDate = (date) => {
    if (Number.isNaN(new Date(date).getTime())) {
      throw new Error('[TimezZ]: Date isn\'t valid. Check documentation for more info. https://github.com/BrooonS/timezz');
    }
  }

  validateElements = (elements) => {
    if (elements.length === 0) {
      throw new Error('[TimezZ]: Selector elements not found. Check documentation for more info. https://github.com/BrooonS/timezz');
    }
  }

  destroy() {
    if (this.settings && typeof this.settings.beforeDestroy === 'function') {
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
