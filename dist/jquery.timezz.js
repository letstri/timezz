/*!
 * @jQuery TimezZ: Plugin for countdown and count forward
 *
 * @Contribute: https://github.com/BrooonS/TimezZ
 *
 * @license: MIT license: http://opensource.org/licenses/MIT
 */

jQuery(function($) {

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

      var countDownDate = new Date(settings.date).getTime();

      setInterval(function() {

        var now = new Date().getTime(),
            distance = countDownDate - now;

        var days = "<" + settings.tagNumber + ">" + Math.floor(Math.abs(distance / (1000 * 60 * 60 * 24))) + "</" + settings.tagNumber + ">",
            hours = "<" + settings.tagNumber + ">" + Math.floor((Math.abs(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) + "</" + settings.tagNumber + ">",
            minutes = "<" + settings.tagNumber + ">" + Math.floor((Math.abs(distance % (1000 * 60 * 60)) / (1000 * 60))) + "</" + settings.tagNumber + ">",
            seconds = "<" + settings.tagNumber + ">" + Math.floor((Math.abs(distance % (1000 * 60)) / 1000)) + "</" + settings.tagNumber + ">";

        ths.html(
          days + "<" + settings.tagLetter + ">" + settings.days + "</" + settings.tagLetter + "> " +
          hours + "<" + settings.tagLetter + ">" + settings.hours + "</" + settings.tagLetter + "> " +
          minutes + "<" + settings.tagLetter + ">" + settings.minutes + "</" + settings.tagLetter + "> " +
          seconds + "<" + settings.tagLetter + ">" + settings.seconds + "</" + settings.tagLetter + "> "
        );

      }, 1000);

    });

  };
});