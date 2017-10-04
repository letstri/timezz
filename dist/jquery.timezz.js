/*!
 * @jQuery TimezZ v1.2.3: Plugin for countdown and count forward
 *
 * @Contribute: https://github.com/BrooonS/TimezZ
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 */

(function($) {

  $.fn.timezz = function( options ) {

    var settings = $.extend({
      'date' : 'January 1, 2040 00:00:00',
      'days' : 'd',
      'hours' : 'h',
      'minutes' : 'm',
      'seconds' : 's',
      'tagNumber' : 'span',
      'tagLetter' : 'i'
    }, options);

    return this.each(function() {

      var ths = $(this);

      // Time specified in the settings
      var countDownDate = new Date(settings.date).getTime();

      setInterval(function() {

        // Open and Close tags
        var tagNumberOpen  = "<" + settings.tagNumber + ">",
            tagNumberClose = "</" + settings.tagNumber + ">",
            tagLetterOpen  = "<" + settings.tagLetter + ">",
            tagLetterClose = "</" + settings.tagLetter + "> ";

        // Current time
        var now = new Date().getTime(),
            distance = countDownDate - now;

        /**
         * Mathematical calculation
         * 0 - added zero before
         * Math.floor - calculate
         * Math.abs - absolute value of a number
         * Hard mathematics
         * slice() - removes excess number
         */
        var days = Math.floor(Math.abs(distance / (1000 * 60 * 60 * 24))),
            hours = ("0" + Math.floor((Math.abs(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))).slice(-2),
            minutes = ("0" + Math.floor((Math.abs(distance % (1000 * 60 * 60)) / (1000 * 60)))).slice(-2),
            seconds = ("0" + Math.floor((Math.abs(distance % (1000 * 60)) / 1000))).slice(-2);

        // Output
        ths.html(
          tagNumberOpen + days + tagLetterOpen + settings.days + tagLetterClose + tagNumberClose +
          tagNumberOpen + hours + tagLetterOpen + settings.hours + tagLetterClose + tagNumberClose +
          tagNumberOpen + minutes + tagLetterOpen + settings.minutes + tagLetterClose + tagNumberClose +
          tagNumberOpen + seconds + tagLetterOpen + settings.seconds + tagLetterClose + tagNumberClose
        );

      }, 1000);

    });

  };
})(jQuery);