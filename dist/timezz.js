(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TimezZ", [], factory);
	else if(typeof exports === 'object')
		exports["TimezZ"] = factory();
	else
		root["TimezZ"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./timezz.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, repository, keywords, author, license, bugs, homepage, dependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"timezz\",\"version\":\"6.0.0\",\"description\":\"TimezZ - with this plugin you can easily make a stopwatch or timer.\",\"main\":\"dist/timezz.js\",\"scripts\":{\"dev\":\"webpack --env development --watch\",\"build\":\"webpack --env production && webpack --env development\",\"docs-server\":\"docsify serve ./docs\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/BrooonS/timezz.git\"},\"keywords\":[\"webpack\",\"js\",\"javascript\",\"library\",\"es6\",\"commonjs\",\"timezz\",\"plugin\",\"time\",\"timer\",\"countdown\",\"count\",\"forward\",\"repeat\"],\"author\":\"Valery Strelets\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/BrooonS/timezz/issues\"},\"homepage\":\"https://github.com/BrooonS/timezz#readme\",\"dependencies\":{\"@babel/core\":\"7.11.6\",\"@babel/plugin-proposal-class-properties\":\"7.10.4\",\"@babel/preset-env\":\"7.11.5\",\"babel-eslint\":\"10.1.0\",\"babel-loader\":\"8.1.0\",\"eslint\":\"7.10.0\",\"eslint-config-airbnb\":\"18.2.0\",\"eslint-loader\":\"4.0.2\",\"eslint-plugin-import\":\"2.22.1\",\"eslint-plugin-jsx-a11y\":\"6.3.1\",\"eslint-plugin-react\":\"7.21.3\",\"react\":\"16.13.1\",\"webpack\":\"4.44.2\",\"webpack-cli\":\"3.3.12\"}}");

/***/ }),

/***/ "./timezz.js":
/*!*******************!*\
  !*** ./timezz.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimezZ; });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./package.json */ "./package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./package.json */ "./package.json", 1);
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * TimezZ - with this plugin you can easily make a stopwatch or timer.
 *
 * @author Valery Strelets
 * @see https://github.com/BrooonS/TimezZ
 * @license https://github.com/BrooonS/timezz/blob/master/LICENSE
 */



var ONE_SECOND = 1000;
var ONE_MINUTE = ONE_SECOND * 60;
var ONE_HOUR = ONE_MINUTE * 60;
var ONE_DAY = ONE_HOUR * 24;

var TimezZ = /*#__PURE__*/function () {
  function TimezZ(selector, userSettings) {
    var _this$settings;

    _classCallCheck(this, TimezZ);

    _defineProperty(this, "validateDate", function (date) {
      if (Number.isNaN(new Date(date).getTime())) {
        throw new Error('[TimezZ]: Date isn\'t valid. Check documentation for more info. https://github.com/BrooonS/timezz');
      }
    });

    _defineProperty(this, "validateElements", function (elements) {
      if (elements.length === 0) {
        throw new Error('[TimezZ]: Selector elements not found. Check documentation for more info. https://github.com/BrooonS/timezz');
      }
    });

    this.VERSION = _package_json__WEBPACK_IMPORTED_MODULE_0__["version"];
    this.elements = Array.from(document.querySelectorAll(selector));
    this.validateDate(userSettings.date);
    this.validateElements(this.elements);
    this.settings = {
      date: userSettings.date,
      isStopped: userSettings.isStopped || false,
      canContinue: false,
      template: userSettings.template || '<span>NUMBER<i>LETTER</i></span> ',
      beforeCreate: userSettings.beforeCreate || function () {},
      beforeDestroy: userSettings.beforeDestroy || function () {},
      update: userSettings.update || function () {}
    };

    if (typeof ((_this$settings = this.settings) === null || _this$settings === void 0 ? void 0 : _this$settings.beforeCreate) === 'function') {
      this.settings.beforeCreate();
    }

    this.initTimer();
  }

  _createClass(TimezZ, [{
    key: "initTimer",
    value: function initTimer() {
      var _this = this;

      if (this.settings === null) {
        return;
      }

      var calculateTemplate = function calculateTemplate(math) {
        var fixNumber = function fixNumber(number) {
          return number >= 10 ? "".concat(number) : "0".concat(number);
        };

        return fixNumber(Math.floor(Math.abs(math)));
      };

      var countDate = new Date(this.settings.date).getTime();
      var currentTime = new Date().getTime();
      var distance = countDate - currentTime;
      var canContinue = this.settings.canContinue || distance > 0;
      var countDays = calculateTemplate(distance / ONE_DAY);
      var countHours = calculateTemplate(distance % ONE_DAY / ONE_HOUR);
      var countMinutes = calculateTemplate(distance % ONE_HOUR / ONE_MINUTE);
      var countSeconds = calculateTemplate(distance % ONE_MINUTE / ONE_SECOND);
      this.elements.forEach(function (element, index) {
        _this.elements[index].innerHTML = _this.formatHTML(canContinue ? countDays : '0', 'days') + _this.formatHTML(canContinue ? countHours : '0', 'hours') + _this.formatHTML(canContinue ? countMinutes : '0', 'minutes') + _this.formatHTML(canContinue ? countSeconds : '0', 'seconds');
      });

      if (!this.settings.isStopped && canContinue) {
        this.timeout = setTimeout(this.initTimer.bind(this), ONE_SECOND);
      }
    }
  }, {
    key: "formatHTML",
    value: function formatHTML(number, letter) {
      var _this2 = this;

      var replace = function replace(string) {
        return string.replace(/NUMBER/g, number).replace(/LETTER/g, letter);
      };

      if (!this.settings) {
        return '';
      }

      if (typeof this.settings.template === 'string') {
        return replace(this.settings.template);
      }

      if (_typeof(this.settings.template) === 'object') {
        return Object.keys(this.settings.template).reduce(function (acc, key) {
          var _this2$settings;

          return acc + replace((_this2$settings = _this2.settings) === null || _this2$settings === void 0 ? void 0 : _this2$settings.template[key]);
        }, '');
      }

      return '';
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      if (this.settings && typeof this.settings.beforeDestroy === 'function') {
        this.settings.beforeDestroy();
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.elements.forEach(function (element, index) {
        _this3.elements[index].innerHTML = '';
      });
      this.settings = null;
      this.elements = [];
    }
  }]);

  return TimezZ;
}();



/***/ })

/******/ })["default"];
});