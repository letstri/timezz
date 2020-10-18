(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("timezz", [], factory);
	else if(typeof exports === 'object')
		exports["timezz"] = factory();
	else
		root["timezz"] = factory();
})(typeof self === 'undefined' ? this : self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./timezz.ts":
/*!*******************!*\
  !*** ./timezz.ts ***!
  \*******************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [used in main] [usage prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var TIMEZZ = '[TimezZ]';
var ONE_SECOND = 1000;
var ONE_MINUTE = ONE_SECOND * 60;
var ONE_HOUR = ONE_MINUTE * 60;
var ONE_DAY = ONE_HOUR * 24;
var DEFAULT_TEMPLATE = '<span>[NUMBER] <i>[TEXT]</i></span> ';

var Timezz = /*#__PURE__*/function () {
  function Timezz() {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var userSettings = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Timezz);

    this.checkFields = function (settings) {
      var warn = function warn(field, types) {
        if (settings[field] !== undefined && types.length) {
          // eslint-disable-next-line no-console
          console.warn("".concat(TIMEZZ, ": '").concat(field, "' should be ").concat(types.length > 1 ? 'one of the types' : 'the type', ": ").concat(types.join(', '), "."));
        }
      };

      if (!(settings.date instanceof Date) && typeof settings.date !== 'string' && typeof settings.date !== 'number') {
        warn('date', ['Date', 'string', 'number']);
      }

      if (typeof settings.stop !== 'boolean') {
        warn('stop', ['boolean']);
      }

      if (typeof settings.canContinue !== 'boolean') {
        warn('canContinue', ['boolean']);
      }

      if (typeof settings.template !== 'string' && _typeof(settings.template) !== 'object' && typeof settings.template !== 'function') {
        warn('template', ['string', 'function', "{\n        days?: string | function,\n        hours?: string | function,\n        minutes?: string | function,\n        seconds?: string | function,\n      }"]);
      }
    };

    this.fixNumber = function (math) {
      var fixZero = function fixZero(number) {
        return number >= 10 ? "".concat(number) : "0".concat(number);
      };

      return fixZero(Math.floor(Math.abs(math)));
    };

    this.elements = elements;
    this.checkFields(userSettings);
    this.settings = {
      date: userSettings.date,
      stop: userSettings.stop || false,
      canContinue: userSettings.canContinue || false,
      template: userSettings.template || DEFAULT_TEMPLATE
    };

    if (typeof this.beforeCreate === 'function') {
      this.beforeCreate(this.settings);
    }

    this.initTimer();
  }

  _createClass(Timezz, [{
    key: "initTimer",
    value: function initTimer() {
      var _this = this;

      var countDate = new Date(this.settings.date).getTime();
      var currentTime = new Date().getTime();
      var distance = countDate - currentTime;
      var canContinue = this.settings.canContinue || distance > 0;
      var countDays = this.fixNumber(distance / ONE_DAY);
      var countHours = this.fixNumber(distance % ONE_DAY / ONE_HOUR);
      var countMinutes = this.fixNumber(distance % ONE_HOUR / ONE_MINUTE);
      var countSeconds = this.fixNumber(distance % ONE_MINUTE / ONE_SECOND);
      var updateEvent = {
        days: Number(countDays),
        hours: Number(countHours),
        minutes: Number(countMinutes),
        seconds: Number(countSeconds),
        distance: Math.abs(distance)
      };

      if (typeof this.update === 'function') {
        this.update(updateEvent);
      }

      this.elements.forEach(function (element, index) {
        _this.elements[index].innerHTML = _this.formatHTML(canContinue ? countDays : 0, 'days', updateEvent) + _this.formatHTML(canContinue ? countHours : 0, 'hours', updateEvent) + _this.formatHTML(canContinue ? countMinutes : 0, 'minutes', updateEvent) + _this.formatHTML(canContinue ? countSeconds : 0, 'seconds', updateEvent);
      });

      if (!this.settings.stop && canContinue) {
        this.timeout = setTimeout(this.initTimer.bind(this), ONE_SECOND);
      }
    }
  }, {
    key: "formatHTML",
    value: function formatHTML(number, text, event) {
      var replace = function replace(string) {
        return string.replace(/\[NUMBER]/gi, number.toString()).replace(/\[TEXT]/gi, text);
      };

      if (_typeof(this.settings.template) === 'object') {
        var _this$settings$templa2;

        if (typeof this.settings.template[text] === 'function') {
          var _this$settings$templa;

          return replace((_this$settings$templa = this.settings.template[text](event)) !== null && _this$settings$templa !== void 0 ? _this$settings$templa : DEFAULT_TEMPLATE);
        }

        return replace((_this$settings$templa2 = this.settings.template[text]) !== null && _this$settings$templa2 !== void 0 ? _this$settings$templa2 : DEFAULT_TEMPLATE);
      }

      if (typeof this.settings.template === 'function') {
        return replace(this.settings.template(event));
      }

      return replace(this.settings.template);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (typeof this.beforeDestroy === 'function') {
        this.beforeDestroy();
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.elements.forEach(function (element, index) {
        _this2.elements[index].innerHTML = '';
      });
      this.elements = [];
    }
  }]);

  return Timezz;
}();

var timezz = function timezz(selector, userSettings) {
  var elements = Array.from(document.querySelectorAll(selector));

  if (Number.isNaN(new Date(userSettings.date).getTime())) {
    throw new Error("".concat(TIMEZZ, ": Date isn't valid. Check documentation for more info. https://github.com/BrooonS/timezz"));
  }

  if (elements.length === 0) {
    throw new Error("".concat(TIMEZZ, ": Selector elements not found. Check documentation for more info. https://github.com/BrooonS/timezz"));
  }

  return new Timezz(elements, userSettings);
};

timezz.prototype = Timezz.prototype;
exports.default = timezz;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./timezz.ts");
/******/ })()
.default;
});