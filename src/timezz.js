/*!
 * TimezZ v3.0.1: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

class TimezZ {
  constructor(element, userSettings = {}) {
    this.element = document.querySelector(element);
    this.settings = {
      ...{
        date: 'Jan 01, 2040 00:00:00',
        daysName: 'd',
        hoursName: 'h',
        minutesName: 'm',
        secondsName: 's',
        numberTag: 'span',
        letterTag: 'i',
        isStop: false,
      },
      ...userSettings,
    };
    
    this.timer();
  }
  
  timer() {
    const self = this;
    const { date, daysName, hoursName, minutesName, secondsName, isStop } = self.settings;
    const countDate = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;

    // hard math
    const countDays = self.calculateTemplate(distance / ONE_DAY);
    const countHours = self.calculateTemplate(distance % ONE_DAY / ONE_HOUR);
    const countMinutes = self.calculateTemplate(distance % ONE_HOUR / ONE_MINUTE);
    const countSeconds = self.calculateTemplate(distance % ONE_MINUTE / ONE_SECOND);
                                          
    self.element.innerHTML = 
      self.outputTemplate(countDays, daysName) +
      self.outputTemplate(countHours, hoursName) +
      self.outputTemplate(countMinutes, minutesName) +
      self.outputTemplate(countSeconds, secondsName)
    ;

    if (!isStop) {
      setTimeout(() => self.timer(), ONE_SECOND);
    }
  }

  fixNumber(number) {
    return number >= 10 ? number : `0${number}`;
  }

  calculateTemplate(math) {
    return this.fixNumber(Math.floor(Math.abs(math)));
  }

  outputTemplate(unit, unitConfig) {
    const { numberTag, letterTag } = this.settings;

    return `<${numberTag}>${unit}<${letterTag}>${unitConfig}</${letterTag}></${numberTag}> `;
  };
}
