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
var values = ['days', 'hours', 'minutes', 'seconds'];

var Timezz = /*#__PURE__*/function () {
  function Timezz(elements, userSettings) {
    var _this = this;

    _classCallCheck(this, Timezz);

    this.checkFields = function (settings) {
      var warn = function warn(field, types) {
        if (settings[field] !== undefined && types.length) {
          // eslint-disable-next-line no-console
          console.warn("".concat(TIMEZZ, ":"), "Parameter '".concat(field, "' should be ").concat(types.length > 1 ? 'one of the types' : 'the type', ": ").concat(types.join(', '), "."), _this.elements.length > 1 ? _this.elements : _this.elements[0]);
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

      if (typeof settings.beforeCreate !== 'function') {
        warn('beforeCreate', ['function']);
      }

      if (typeof settings.beforeDestroy !== 'function') {
        warn('beforeDestroy', ['function']);
      }

      if (typeof settings.update !== 'function') {
        warn('update', ['function']);
      }
    };

    this.fixZero = function (number) {
      return number >= 10 ? "".concat(number) : "0".concat(number);
    };

    this.fixNumber = function (math) {
      return Math.floor(Math.abs(math));
    };

    this.elements = elements;
    this.checkFields(userSettings);
    this.date = userSettings.date;
    this.stop = userSettings.stop || false;
    this.canContinue = userSettings.canContinue || false;
    this.beforeCreate = userSettings.beforeCreate;
    this.beforeDestroy = userSettings.beforeDestroy;
    this.update = userSettings.update;

    if (typeof this.beforeCreate === 'function') {
      this.beforeCreate();
    }

    this.init();
  }

  _createClass(Timezz, [{
    key: "init",
    value: function init() {
      var countDate = new Date(this.date).getTime();
      var currentTime = new Date().getTime();
      var distance = countDate - currentTime;
      var canContinue = this.canContinue || distance > 0;
      var countDays = this.fixNumber(distance / ONE_DAY);
      var countHours = this.fixNumber(distance % ONE_DAY / ONE_HOUR);
      var countMinutes = this.fixNumber(distance % ONE_HOUR / ONE_MINUTE);
      var countSeconds = this.fixNumber(distance % ONE_MINUTE / ONE_SECOND);
      var info = {
        days: countDays,
        hours: countHours,
        minutes: countMinutes,
        seconds: countSeconds,
        distance: Math.abs(distance)
      };

      if (canContinue && !this.stop) {
        this.setHTML(info);
      }

      if (typeof this.update === 'function') {
        this.update(info);
      }

      if (!this.timeout) {
        this.timeout = setInterval(this.init.bind(this), ONE_SECOND);
      }
    }
  }, {
    key: "setHTML",
    value: function setHTML(updateInfo) {
      var _this2 = this;

      this.elements.forEach(function (element) {
        values.forEach(function (value) {
          var block = element.querySelector("[data-".concat(value, "]"));

          var number = _this2.fixZero(updateInfo[value]);

          if (block && block.innerHTML !== number) {
            block.innerHTML = number;
          }
        });
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (typeof this.beforeDestroy === 'function') {
        this.beforeDestroy();
      }

      if (this.timeout) {
        clearInterval(this.timeout);
        this.timeout = null;
      }

      this.elements.forEach(function (element) {
        values.forEach(function (value) {
          var block = element.querySelector("[data-".concat(value, "]"));

          if (block) {
            block.innerHTML = '<!-- -->';
          }
        });
      });
    }
  }]);

  return Timezz;
}();

var timezz = function timezz(elements, userSettings) {
  var items = []; // For Node.js env

  try {
    if (typeof elements === 'string') {
      items = Array.from(document.querySelectorAll(elements));
    } else if ((Array.isArray(elements) || elements instanceof NodeList) && Array.from(elements).every(function (element) {
      return element instanceof HTMLElement;
    })) {
      items = Array.from(elements);
    } else if (elements instanceof HTMLElement) {
      items = [elements];
    }
  } catch (e) {//
  }

  if (Number.isNaN(new Date(userSettings.date).getTime())) {
    throw new Error("".concat(TIMEZZ, ": Date isn't valid. Check documentation for more info. https://github.com/BrooonS/timezz"));
  }

  return new Timezz(items, userSettings);
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