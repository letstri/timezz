'use strict';

/*!
 * jQuery TimezZ v2.1.0: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

(function($) {

  $.fn.timezz = function(options) {

    var defaultOptions = {
      'date': 'Jan 01, 2040 00:00:00',
      'days': 'd',
      'hours': 'h',
      'minutes': 'm',
      'seconds': 's',
      'tagNumber': 'span',
      'tagLetter': 'i',
      'stop': false
    };

    var settings = $.extend(defaultOptions, options);

    return this.each(function() {

      var ths = $(this);

      // create tags
      var tagNumber = settings.tagNumber,
        tagLetter = settings.tagLetter;

      // time specified in the settings

      var countDate = new Date(settings.date).getTime();

      // time
      var ONE_SECOND = 1000; // ms
      var ONE_MINUTE = ONE_SECOND * 60;
      var ONE_HOUR = ONE_MINUTE * 60;
      var ONE_DAY = ONE_HOUR * 24;

      // fixing zero before output
      var fixNumber = function fixNumber(number) {
        return number >= 10 ? number : '0' + number;
      };

      // template for calculate
      var calculate = function calculate(math) {
        return fixNumber(Math.floor(Math.abs(math)));
      };

      function timer() {

        // current time
        var now = new Date().getTime();
        // distance
        var distance = countDate - now;

        // hard mathematics
        var days = calculate(distance / ONE_DAY);
        var hours = calculate(distance % ONE_DAY / ONE_HOUR);
        var minutes = calculate(distance % ONE_HOUR / ONE_MINUTE);
        var seconds = calculate(distance % ONE_MINUTE / ONE_SECOND);

        // template for output
        var output = function output(unit, unitConfig) {
          return '<' + tagNumber + '>' + unit + '<' + tagLetter + '>' + unitConfig + '</' + tagLetter + '></' + tagNumber + '> ';
        };

        // output
        ths.html(output(days, settings.days) + output(hours, settings.hours) + output(minutes, settings.minutes) + output(seconds, settings.seconds));
      }

      // output before calculate
      timer();

      // calculate and output with constant updating
      if (settings.stop == false) setInterval(timer, ONE_SECOND);
    });
  };
})(jQuery);