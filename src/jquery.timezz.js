/*!
 * @jQuery TimezZ v1.3.0: Plugin for countdown and count forward
 *
 * @Contribute: https://github.com/BrooonS/TimezZ
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 */

($ => {

  $.fn.timezz = function (options) {

    const settings = $.extend({
      'date': 'January 1, 2040 00:00:00',
      'days': 'd',
      'hours': 'h',
      'minutes': 'm',
      'seconds': 's',
      'tagNumber': 'span',
      'tagLetter': 'i'
    }, options);

    return this.each(function () {

      const ths = $(this);

      // Time specified in the settings
      const countDownDate = new Date(settings.date).getTime();

      function timer() {

        // Open and Close tags
        const tagNumberOpen = `<${settings.tagNumber}>`;
        const tagNumberClose = `</${settings.tagNumber}>`;
        const tagLetterOpen = `<${settings.tagLetter}>`;
        const tagLetterClose = `</${settings.tagLetter}> `;

        // Current time
        const now = new Date().getTime();
        // Distance
        const distance = countDownDate - now;

        // fixing zero before output
        function fixNumber(number) {
          return number >= 10 ? number : `0${number}`;
        }

        /**
         * Mathematical calculation
         *
         * Math.floor - calculate
         * Math.abs - absolute value of a number
         * Hard mathematics
         */
        let days = fixNumber(Math.floor(Math.abs(distance / (1000 * 60 * 60 * 24))));
        let hours = fixNumber(Math.floor(Math.abs(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        let minutes = fixNumber(Math.floor(Math.abs(distance % (1000 * 60 * 60)) / (1000 * 60)));
        let seconds = fixNumber(Math.floor(Math.abs(distance % (1000 * 60)) / 1000));

        // Output
        ths.html(
          tagNumberOpen + days + tagLetterOpen + settings.days + tagLetterClose + tagNumberClose + 
          tagNumberOpen + hours + tagLetterOpen + settings.hours + tagLetterClose + tagNumberClose + 
          tagNumberOpen + minutes + tagLetterOpen + settings.minutes + tagLetterClose + tagNumberClose + 
          tagNumberOpen + seconds + tagLetterOpen + settings.seconds + tagLetterClose + tagNumberClose
        );
      }

      // output before calculate
      ths.html(timer());

      // calculate and output with constant updating
      setInterval(() => {
        timer();
      }, 1000);

    });
  };
})(jQuery);