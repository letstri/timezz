/*!
 * TimezZ v5.0.0: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

export default class TimezZ {
  constructor(selector, userSettings = {}) {
    if (selector === undefined) {
      throw new Error('Selector isn\'t passed.');
    }

    this.element = document.querySelector(selector);
    this.settings = {
      date: 'Jan 01, 2040 00:00:00',
      daysName: 'd',
      hoursName: 'h',
      minutesName: 'm',
      secondsName: 's',
      isStopped: false,
      template: '<span>NUMBER<i>LETTER</i></span> ',
      beforeCreate() {},
      ...userSettings,
    };

    this.initTimer();
  }

  initTimer() {
    const {
      date,
      daysName,
      hoursName,
      isStopped,
      minutesName,
      secondsName,
      beforeCreate,
    } = this.settings;

    const countDate = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;

    const calculateTemplate = (math) => {
      const fixNumber = number => (number >= 10 ? number : `0${number}`);

      return fixNumber(Math.floor(Math.abs(math)));
    };

    /**
     * Hard math.
     */
    const countDays = calculateTemplate(distance / ONE_DAY);
    const countHours = calculateTemplate((distance % ONE_DAY) / ONE_HOUR);
    const countMinutes = calculateTemplate((distance % ONE_HOUR) / ONE_MINUTE);
    const countSeconds = calculateTemplate((distance % ONE_MINUTE) / ONE_SECOND);

    /**
     * User callback.
     */
    if (typeof beforeCreate === 'function') {
      beforeCreate();
    }

    this.element.innerHTML = (
      this.outputTemplate(countDays, daysName)
      + this.outputTemplate(countHours, hoursName)
      + this.outputTemplate(countMinutes, minutesName)
      + this.outputTemplate(countSeconds, secondsName)
    );

    if (!isStopped) {
      setTimeout(this.initTimer.bind(this), ONE_SECOND);
    }
  }

  outputTemplate(number, letter) {
    return this.settings.template.replace(/NUMBER/g, number).replace(/LETTER/g, letter);
  }
}
