'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * TimezZ v3.2.0: Plugin for countdown and count forward
 *
 * Contribute: https://github.com/BrooonS/TimezZ
 * Released under the MIT license: http://opensource.org/licenses/MIT
 */

(function () {
  var ONE_SECOND = 1000;
  var ONE_MINUTE = ONE_SECOND * 60;
  var ONE_HOUR = ONE_MINUTE * 60;
  var ONE_DAY = ONE_HOUR * 24;

  var TimezZ = function () {
    function TimezZ(element) {
      var userSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, TimezZ);

      this.element = document.querySelector(element);
      this.settings = _extends({
        date: 'Jan 01, 2040 00:00:00',
        daysName: 'd',
        hoursName: 'h',
        minutesName: 'm',
        secondsName: 's',
        isStop: false,
        template: '<span>NUMBER<i>LETTER</i></span> ',
        beforeCreate: function beforeCreate() {}
      }, userSettings);

      this.timer();
    }

    _createClass(TimezZ, [{
      key: 'timer',
      value: function timer() {
        var _this = this;

        var _settings = this.settings,
            date = _settings.date,
            daysName = _settings.daysName,
            hoursName = _settings.hoursName,
            minutesName = _settings.minutesName,
            secondsName = _settings.secondsName,
            isStop = _settings.isStop,
            beforeCreate = _settings.beforeCreate;


        var countDate = new Date(date).getTime();
        var currentTime = new Date().getTime();
        var distance = countDate - currentTime;

        // hard math
        var countDays = this.calculateTemplate(distance / ONE_DAY);
        var countHours = this.calculateTemplate(distance % ONE_DAY / ONE_HOUR);
        var countMinutes = this.calculateTemplate(distance % ONE_HOUR / ONE_MINUTE);
        var countSeconds = this.calculateTemplate(distance % ONE_MINUTE / ONE_SECOND);

        /**
         * User callback.
         */
        if (typeof beforeCreate === 'function') {
          beforeCreate();
        }

        this.element.innerHTML = this.outputTemplate(countDays, daysName) + this.outputTemplate(countHours, hoursName) + this.outputTemplate(countMinutes, minutesName) + this.outputTemplate(countSeconds, secondsName);

        if (!isStop) {
          setTimeout(function () {
            return _this.timer();
          }, ONE_SECOND);
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
      value: function outputTemplate(number, letter) {
        var template = this.settings.template;

        var newTemplate = '';

        newTemplate = template.replace(/NUMBER/g, number).replace(/LETTER/g, letter);

        return newTemplate;
      }
    }]);

    return TimezZ;
  }();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = TimezZ;
  } else {
    window.TimezZ = TimezZ;
  }
})();