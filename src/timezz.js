/*!
 * TimezZ v4.0.0: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

(() => {
  const ONE_SECOND = 1000;
  const ONE_MINUTE = ONE_SECOND * 60;
  const ONE_HOUR = ONE_MINUTE * 60;
  const ONE_DAY = ONE_HOUR * 24;

  class TimezZ {
    constructor(element, userSettings = {}) {
      this.element = document.querySelector(element);
      this.settings = {
        date: 'Jan 01, 2040 00:00:00',
        daysName: 'd',
        hoursName: 'h',
        minutesName: 'm',
        secondsName: 's',
        isStop: false,
        template: '<span>NUMBER<i>LETTER</i></span> ',
        beforeCreate() {},
        ...userSettings,
      };
      
      this.timer();
    }
    
    timer() {
      const {
        date,
        daysName,
        hoursName,
        minutesName,
        secondsName,
        isStop,
        beforeCreate,
      } = this.settings;

      const countDate = new Date(date).getTime();
      const currentTime = new Date().getTime();
      const distance = countDate - currentTime;

      // hard math
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
      
      this.element.innerHTML = 
        this.outputTemplate(countDays, daysName) +
        this.outputTemplate(countHours, hoursName) +
        this.outputTemplate(countMinutes, minutesName) +
        this.outputTemplate(countSeconds, secondsName);

      if (!isStop) {
        setTimeout(() => this.timer(), ONE_SECOND);
      }
    }

    fixNumber(number) {
      return number >= 10 ? number : `0${number}`;
    }

    calculateTemplate(math) {
      return this.fixNumber(Math.floor(Math.abs(math)));
    }

    outputTemplate(number, letter) {
      const { template } = this.settings;
      let newTemplate = '';

      newTemplate = template.replace(/NUMBER/g, number).replace(/LETTER/g, letter);

      return newTemplate;
    }
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = TimezZ;
  } else {
    window.TimezZ = TimezZ;
  }
})();
