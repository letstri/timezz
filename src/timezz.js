/*!
 * TimezZ v4.0.1: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

(() => {
  class TimezZ {
    constants = {
      ONE_SECOND: 1000,
      ONE_MINUTE: 1000 * 60,
      ONE_HOUR: 1000 * 60 * 60,
      ONE_DAY: 1000 * 60 * 60 * 24,
    }

    constructor(element, userSettings = {}) {
      this.element = document.querySelector(element);
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

      const {
        ONE_SECOND,
        ONE_MINUTE,
        ONE_HOUR,
        ONE_DAY,
      } = this.constants;

      const countDate = new Date(date).getTime();
      const currentTime = new Date().getTime();
      const distance = countDate - currentTime;

      /**
       * Hard math.
       */
      const countDays = this.calculateTemplate(distance / ONE_DAY);
      const countHours = this.calculateTemplate((distance % ONE_DAY) / ONE_HOUR);
      const countMinutes = this.calculateTemplate((distance % ONE_HOUR) / ONE_MINUTE);
      const countSeconds = this.calculateTemplate((distance % ONE_MINUTE) / ONE_SECOND);

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

    fixNumber = number => (number >= 10 ? number : `0${number}`);

    calculateTemplate = math => this.fixNumber(Math.floor(Math.abs(math)));

    outputTemplate(number, letter) {
      return this.settings.template.replace(/NUMBER/g, number).replace(/LETTER/g, letter);
    }
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = TimezZ;
  } else {
    window.TimezZ = TimezZ;
  }
})();
