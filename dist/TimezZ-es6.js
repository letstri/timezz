'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * TimezZ v3.0.0: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

var TimezZ = function () {
  function TimezZ(element) {
    var userSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TimezZ);

    this.ONE_SECOND = 1000;
    this.ONE_MINUTE = this.ONE_SECOND * 60;
    this.ONE_HOUR = this.ONE_MINUTE * 60;
    this.ONE_DAY = this.ONE_HOUR * 24;

    this.element = document.querySelector(element);
    this.settings = _extends({
      date: 'Jan 01, 2040 00:00:00',
      daysName: 'd',
      hoursName: 'h',
      minutesName: 'm',
      secondsName: 's',
      numberTag: 'span',
      letterTag: 'i',
      stop: false
    }, userSettings);

    this.timer();
  }

  _createClass(TimezZ, [{
    key: 'timer',
    value: function timer() {
      var self = this;
      var _self$settings = self.settings,
          date = _self$settings.date,
          daysName = _self$settings.daysName,
          hoursName = _self$settings.hoursName,
          minutesName = _self$settings.minutesName,
          secondsName = _self$settings.secondsName,
          stop = _self$settings.stop;

      var countDate = new Date(date).getTime();
      var currentTime = new Date().getTime();
      var distance = countDate - currentTime;
      // hard math
      var countDays = self.calculateTemplate(distance / self.ONE_DAY);
      var countHours = self.calculateTemplate(distance % self.ONE_DAY / self.ONE_HOUR);
      var countMinutes = self.calculateTemplate(distance % self.ONE_HOUR / self.ONE_MINUTE);
      var countSeconds = self.calculateTemplate(distance % self.ONE_MINUTE / self.ONE_SECOND);

      self.element.innerHTML = self.outputTemplate(countDays, daysName) + self.outputTemplate(countHours, hoursName) + self.outputTemplate(countMinutes, minutesName) + self.outputTemplate(countSeconds, secondsName);

      if (stop === false) {
        setTimeout(function () {
          return self.timer();
        }, self.ONE_SECOND);
      }
    }
  }, {
    key: 'fixNumber',
    value: function fixNumber(number) {
      return number >= 10 ? number : '0' + number;
    }
  }, {
    key: 'calculateTemplate',
    value: function calculateTemplate(math) {
      return this.fixNumber(Math.floor(Math.abs(math)));
    }
  }, {
    key: 'outputTemplate',
    value: function outputTemplate(unit, unitConfig) {
      var _settings = this.settings,
          tagLetter = _settings.tagLetter,
          tagNumber = _settings.tagNumber;


      return '<' + tagNumber + '>' + unit + '<' + tagLetter + '>' + unitConfig + '</' + tagLetter + '></' + tagNumber + '> ';
    }
  }]);

  return TimezZ;
}();