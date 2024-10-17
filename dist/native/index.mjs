var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const TIMEZZ = "[TimezZ]";
const REPOSITORY = "https://github.com/letstri/timezz";
const MILLISECONDS_IN_SECOND = 1e3;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_YEAR = 365;
const ONE_SECOND = MILLISECONDS_IN_SECOND;
const ONE_MINUTE = ONE_SECOND * SECONDS_IN_MINUTE;
const ONE_HOUR = ONE_MINUTE * MINUTES_IN_HOUR;
const ONE_DAY = ONE_HOUR * HOURS_IN_DAY;
const ONE_YEAR = ONE_DAY * DAYS_IN_YEAR;
const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})\D*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
const partNames = ["years", "days", "hours", "minutes", "seconds"];
const fixZero = (number) => number >= 10 ? `${number}` : `0${number}`;
const fixNumber = (math) => Math.floor(Math.abs(math));
function parseDate(date) {
  if (date instanceof Date) {
    return new Date(date);
  }
  if (typeof date === "string" && !/Z$/i.test(date)) {
    const d = date.match(REGEX_PARSE);
    if (d) {
      const m = d[2] - 1 || 0;
      const ms = (d[7] || "0").substring(0, 3);
      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }
  const newDate = new Date(date);
  if (newDate.toString() === "Invalid Date") {
    throw new Error(`${TIMEZZ}: Date is invalid. Check documentation for more info. ${REPOSITORY}`);
  }
  return new Date(date);
}
class Timezz {
  constructor(element, userSettings) {
    __publicField(this, "element");
    __publicField(this, "date");
    __publicField(this, "pause", false);
    __publicField(this, "stopOnZero", true);
    __publicField(this, "isDestroyed", false);
    __publicField(this, "beforeCreate");
    __publicField(this, "beforeUpdate");
    __publicField(this, "update");
    __publicField(this, "HTMLParts", partNames.reduce(
      (acc, part) => ({
        ...acc,
        [part]: null
      }),
      {}
    ));
    __publicField(this, "interval", null);
    __publicField(this, "checkFields", (settings) => {
      const warn = (field, types) => {
        if (settings[field] !== void 0 && types.length) {
          console.warn(
            `${TIMEZZ}:`,
            `Parameter '${field}' should be ${types.length > 1 ? "one of the types" : "the type"}: ${types.join(", ")}.`,
            this.element
          );
        }
      };
      if (typeof settings.pause !== "boolean") {
        warn("pause", ["boolean"]);
      }
      if (typeof settings.stopOnZero !== "boolean") {
        warn("stopOnZero", ["boolean"]);
      }
      if (typeof settings.beforeCreate !== "function") {
        warn("beforeCreate", ["function"]);
      }
      if (typeof settings.beforeUpdate !== "function") {
        warn("beforeUpdate", ["function"]);
      }
      if (typeof settings.update !== "function") {
        warn("update", ["function"]);
      }
    });
    this.element = element;
    this.checkFields(userSettings);
    this.date = parseDate(userSettings.date);
    this.pause = userSettings.pause || false;
    this.stopOnZero = typeof userSettings.stopOnZero === "boolean" ? userSettings.stopOnZero : true;
    this.beforeCreate = userSettings.beforeCreate;
    this.beforeUpdate = userSettings.beforeUpdate;
    this.update = userSettings.update;
    if (typeof this.beforeCreate === "function") {
      this.beforeCreate();
    }
    this.init();
  }
  init() {
    this.isDestroyed = false;
    this.updateHTMLParts();
    const countDate = new Date(this.date).getTime();
    const currentTime = (/* @__PURE__ */ new Date()).getTime();
    const distance = countDate - currentTime;
    const needToStopOnZero = this.stopOnZero ? distance < 0 : false;
    const count = needToStopOnZero ? partNames.reduce(
      (acc, name) => ({ ...acc, [name]: 0 }),
      {}
    ) : this.calculate(distance);
    const info = {
      ...count,
      distance: Math.abs(distance),
      isTimeOver: distance <= 0
    };
    if (typeof this.beforeUpdate === "function") {
      this.beforeUpdate();
    }
    if (!needToStopOnZero && !this.pause || !this.interval) {
      this.setHTML(info);
    }
    if (typeof this.update === "function") {
      this.update(info);
    }
    if (!this.interval) {
      this.interval = setInterval(this.init.bind(this), ONE_SECOND);
    }
  }
  calculate(distance) {
    const count = {
      years: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    };
    const seconds = fixNumber(distance % ONE_MINUTE / ONE_SECOND);
    const minutes = fixNumber(distance % ONE_HOUR / ONE_MINUTE);
    const hours = fixNumber(distance % ONE_DAY / ONE_HOUR);
    const days = fixNumber(distance % ONE_YEAR / ONE_DAY);
    const years = fixNumber(distance / ONE_YEAR);
    if (this.HTMLParts.seconds) {
      count.seconds = seconds;
    }
    if (this.HTMLParts.minutes) {
      count.minutes = minutes;
    } else {
      count.seconds = (count.days || seconds) + minutes * SECONDS_IN_MINUTE;
    }
    if (this.HTMLParts.hours) {
      count.hours = hours;
    } else if (this.HTMLParts.minutes) {
      count.minutes = (count.minutes || minutes) + hours * MINUTES_IN_HOUR;
    } else if (this.HTMLParts.seconds) {
      count.seconds = (count.seconds || seconds) + hours * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
    }
    if (this.HTMLParts.days) {
      count.days = days;
    } else if (this.HTMLParts.hours) {
      count.hours = (count.hours || hours) + days * HOURS_IN_DAY;
    } else if (this.HTMLParts.minutes) {
      count.minutes = (count.minutes || minutes) + days * HOURS_IN_DAY * MINUTES_IN_HOUR;
    } else if (this.HTMLParts.seconds) {
      count.seconds = (count.seconds || seconds) + days * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
    }
    if (this.HTMLParts.years) {
      count.years = years;
    } else if (this.HTMLParts.days) {
      count.days = (count.days || days) + years * DAYS_IN_YEAR;
    } else if (this.HTMLParts.hours) {
      count.hours = (count.hours || hours) + years * DAYS_IN_YEAR * HOURS_IN_DAY;
    } else if (this.HTMLParts.minutes) {
      count.minutes = (count.minutes || minutes) + years * DAYS_IN_YEAR * HOURS_IN_DAY * MINUTES_IN_HOUR;
    } else if (this.HTMLParts.seconds) {
      count.seconds = (count.seconds || seconds) + years * DAYS_IN_YEAR * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
    }
    return count;
  }
  updateHTMLParts() {
    partNames.forEach((part) => {
      const block = this.element.querySelector(`[data-${part}]`);
      if (block) {
        this.HTMLParts[part] = block;
      }
    });
  }
  setHTML(updateInfo) {
    partNames.forEach((part) => {
      if (!this.element) {
        throw new Error(
          `${TIMEZZ}: Element isn't passed. Check documentation for more info. ${REPOSITORY}`
        );
      }
      const partNumber = updateInfo[part];
      if (partNumber === null) {
        return;
      }
      const block = this.element.querySelector(`[data-${part}]`);
      const number = fixZero(partNumber);
      if (block && block.innerHTML !== number) {
        block.innerHTML = number;
      }
    });
  }
  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    partNames.forEach((value) => {
      if (!this.element) {
        return;
      }
      const block = this.element.querySelector(`[data-${value}]`);
      if (block) {
        block.innerHTML = "";
      }
    });
    this.isDestroyed = true;
  }
}
function timezz(element, settings) {
  if (!element || !(element instanceof Element) || !(element instanceof HTMLElement)) {
    throw new Error(
      `${TIMEZZ}: Element isn't passed. Check documentation for more info. ${REPOSITORY}`
    );
  }
  if (!settings || typeof settings !== "object" || typeof settings.date !== "string" && typeof settings.date !== "number" && !(settings.date instanceof Date)) {
    throw new Error(`${TIMEZZ}: Date is invalid. Check documentation for more info. ${REPOSITORY}`);
  }
  return new Timezz(element, settings);
}
timezz.prototype = Timezz.prototype;

export { Timezz, timezz };
