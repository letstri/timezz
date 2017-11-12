/*!
 * jQuery TimezZ v2.1.0: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

($ => {

  $.fn.timezz = function (options) {

    const defaultOptions = {
      'date' : 'Jan 01, 2040 00:00:00',
      'days' : 'd',
      'hours' : 'h',
      'minutes' : 'm',
      'seconds' : 's',
      'tagNumber' : 'span',
      'tagLetter' : 'i',
      'stop' : false
    };

    const settings = $.extend(defaultOptions, options);

    return this.each(function () {

      const ths = $(this);

      // create tags
      const { tagNumber, tagLetter } = settings;

      // time specified in the settings
      const countDate = new Date(settings.date).getTime();

      // time
      const ONE_SECOND = 1000; // ms
      const ONE_MINUTE = ONE_SECOND * 60;
      const ONE_HOUR = ONE_MINUTE * 60;
      const ONE_DAY = ONE_HOUR * 24;

      // fixing zero before output
      const fixNumber = number => number >= 10 ? number : `0${number}`;

      // template for calculate
      const calculate = math => fixNumber(Math.floor(Math.abs(math)));

      function timer() {

        // current time
        const now = new Date().getTime();
        // distance
        const distance = countDate - now;

        // hard mathematics
        let days = calculate(distance / ONE_DAY);
        let hours = calculate(distance % ONE_DAY / ONE_HOUR);
        let minutes = calculate(distance % ONE_HOUR / ONE_MINUTE);
        let seconds = calculate(distance % ONE_MINUTE / ONE_SECOND);

        // template for output
        const output = (unit, unitConfig) => `<${tagNumber}>${unit}<${tagLetter}>${unitConfig}</${tagLetter}></${tagNumber}> `;
                                             
        // output
        ths.html(
          output(days, settings.days) +
          output(hours, settings.hours) +
          output(minutes, settings.minutes) +
          output(seconds, settings.seconds)
        )
      }

      // output before calculate
      timer()

      // calculate and output with constant updating
      if (settings.stop == false) setInterval(timer, ONE_SECOND)
    })
  }
})(jQuery);