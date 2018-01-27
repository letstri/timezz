/*!
 * TimezZ v3.0.0: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

class TimezZ {
  constructor(element, userSettings = {}) {
    this.ONE_SECOND = 1000;
    this.ONE_MINUTE = this.ONE_SECOND * 60;
    this.ONE_HOUR = this.ONE_MINUTE * 60;
    this.ONE_DAY = this.ONE_HOUR * 24;
    
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
        stop: false,
      },
      ...userSettings,
    };
    
    this.timer();
  }
  
  timer() {
    const self = this;
    const {date, daysName, hoursName, minutesName, secondsName, stop} = self.settings;
    const countDate = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;
    // hard math
    const countDays = self.calculateTemplate(distance / self.ONE_DAY);
    const countHours = self.calculateTemplate(distance % self.ONE_DAY / self.ONE_HOUR);
    const countMinutes = self.calculateTemplate(distance % self.ONE_HOUR / self.ONE_MINUTE);
    const countSeconds = self.calculateTemplate(distance % self.ONE_MINUTE / self.ONE_SECOND);
                                          
    self.element.innerHTML = 
      self.outputTemplate(countDays, daysName) +
      self.outputTemplate(countHours, hoursName) +
      self.outputTemplate(countMinutes, minutesName) +
      self.outputTemplate(countSeconds, secondsName)
    ;

    if (stop === false) {
      setTimeout(() => self.timer(), self.ONE_SECOND);
    }
  }

  fixNumber(number) {
    return number >= 10 ? number : `0${number}`;
  }

  calculateTemplate(math) {
    return this.fixNumber(Math.floor(Math.abs(math)))
  }

  outputTemplate(unit, unitConfig) {
    const {tagLetter, tagNumber} = this.settings;

    return `<${tagNumber}>${unit}<${tagLetter}>${unitConfig}</${tagLetter}></${tagNumber}> `;
  };
}
