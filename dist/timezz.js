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
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/timezz.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/timezz.js":
/*!************************!*\
  !*** ./dist/timezz.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * TimezZ - with this plugin you can easily make a stopwatch or timer.
 *
 * @author Valery Strelets
 * @see https://github.com/BrooonS/TimezZ
 * @license https://github.com/BrooonS/timezz/blob/master/LICENSE
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
var TIMEZZ = '[TimezZ]';
var ONE_SECOND = 1000;
var ONE_MINUTE = ONE_SECOND * 60;
var ONE_HOUR = ONE_MINUTE * 60;
var ONE_DAY = ONE_HOUR * 24;
var DEFAULT_TEMPLATE = '<span>{NUMBER}<i>{TEXT}</i></span> ';

var Timezz = /*#__PURE__*/function () {
  function Timezz() {
    var _userSettings$texts$d, _userSettings$texts, _userSettings$texts$h, _userSettings$texts2, _userSettings$texts$m, _userSettings$texts3, _userSettings$texts$s, _userSettings$texts4;

    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var userSettings = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Timezz);

    this.fixNumber = function (math) {
      var fixZero = function fixZero(number) {
        return number >= 10 ? "".concat(number) : "0".concat(number);
      };

      return fixZero(Math.floor(Math.abs(math)));
    };

    this.elements = elements;
    this.settings = {
      date: userSettings.date,
      texts: {
        days: (_userSettings$texts$d = (_userSettings$texts = userSettings.texts) === null || _userSettings$texts === void 0 ? void 0 : _userSettings$texts.days) !== null && _userSettings$texts$d !== void 0 ? _userSettings$texts$d : 'days',
        hours: (_userSettings$texts$h = (_userSettings$texts2 = userSettings.texts) === null || _userSettings$texts2 === void 0 ? void 0 : _userSettings$texts2.hours) !== null && _userSettings$texts$h !== void 0 ? _userSettings$texts$h : 'hours',
        minutes: (_userSettings$texts$m = (_userSettings$texts3 = userSettings.texts) === null || _userSettings$texts3 === void 0 ? void 0 : _userSettings$texts3.minutes) !== null && _userSettings$texts$m !== void 0 ? _userSettings$texts$m : 'minutes',
        seconds: (_userSettings$texts$s = (_userSettings$texts4 = userSettings.texts) === null || _userSettings$texts4 === void 0 ? void 0 : _userSettings$texts4.seconds) !== null && _userSettings$texts$s !== void 0 ? _userSettings$texts$s : 'seconds'
      },
      isStopped: userSettings.isStopped || false,
      canContinue: userSettings.canContinue || false,
      template: userSettings.template || DEFAULT_TEMPLATE,
      beforeCreate: userSettings.beforeCreate || function () {},
      beforeDestroy: userSettings.beforeDestroy || function () {},
      update: userSettings.update || function () {}
    };

    if (typeof this.settings.beforeCreate === 'function') {
      this.settings.beforeCreate(this.settings);
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

      if (typeof this.settings.update === 'function') {
        this.settings.update({
          days: +countDays,
          hours: +countHours,
          minutes: +countMinutes,
          seconds: +countSeconds,
          distance: Math.abs(distance)
        });
      }

      this.elements.forEach(function (element, index) {
        _this.elements[index].innerHTML = _this.formatHTML(canContinue ? countDays : '0', 'days') + _this.formatHTML(canContinue ? countHours : '0', 'hours') + _this.formatHTML(canContinue ? countMinutes : '0', 'minutes') + _this.formatHTML(canContinue ? countSeconds : '0', 'seconds');
      });

      if (!this.settings.isStopped && canContinue) {
        this.timeout = setTimeout(this.initTimer.bind(this), ONE_SECOND);
      }
    }
  }, {
    key: "formatHTML",
    value: function formatHTML(number, text) {
      var _this2 = this;

      var replace = function replace(string) {
        return string.replace(/{NUMBER}/g, number).replace(/{TEXT}/g, _this2.settings.texts[text]);
      };

      if (_typeof(this.settings.template) === 'object') {
        var _this$settings$templa;

        return replace((_this$settings$templa = this.settings.template[text]) !== null && _this$settings$templa !== void 0 ? _this$settings$templa : DEFAULT_TEMPLATE);
      }

      return replace(this.settings.template);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (typeof this.settings.beforeDestroy === 'function') {
        this.settings.beforeDestroy();
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.elements.forEach(function (element, index) {
        _this3.elements[index].innerHTML = '';
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
exports["default"] = timezz;

/***/ })

/******/ })["default"];
});