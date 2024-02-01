const E = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, c = ["years", "days", "hours", "minutes", "seconds"], l = (n) => n >= 10 ? `${n}` : `0${n}`, f = (n) => Math.floor(Math.abs(n)), h = "[TimezZ]", u = "https://github.com/BrooonS/timezz", d = (n) => {
  if (n instanceof Date)
    return new Date(n);
  if (typeof n == "string" && !/Z$/i.test(n)) {
    const e = n.match(E);
    if (e) {
      const s = e[2] - 1 || 0, o = (e[7] || "0").substring(0, 3);
      return new Date(e[1], s, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, o);
    }
  }
  if (new Date(n).toString() === "Invalid Date")
    throw new Error(`${h}: Date is invalid. Check documentation for more info. ${u}`);
  return new Date(n);
};
class N {
  constructor(t, e) {
    this.pause = !1, this.stopOnZero = !0, this.isDestroyed = !1, this.HTMLParts = c.reduce(
      (s, o) => ({
        ...s,
        [o]: null
      }),
      {}
    ), this.timeout = null, this.checkFields = (s) => {
      const o = (i, r) => {
        s[i] !== void 0 && r.length && console.warn(
          `${h}:`,
          `Parameter '${i}' should be ${r.length > 1 ? "one of the types" : "the type"}: ${r.join(", ")}.`,
          this.element
        );
      };
      typeof s.pause != "boolean" && o("pause", ["boolean"]), typeof s.stopOnZero != "boolean" && o("stopOnZero", ["boolean"]), typeof s.beforeCreate != "function" && o("beforeCreate", ["function"]), typeof s.beforeUpdate != "function" && o("beforeUpdate", ["function"]), typeof s.update != "function" && o("update", ["function"]);
    }, this.element = t, this.checkFields(e), this.date = d(e.date), this.pause = e.pause || !1, this.stopOnZero = typeof e.stopOnZero == "boolean" ? e.stopOnZero : !0, this.beforeCreate = e.beforeCreate, this.beforeUpdate = e.beforeUpdate, this.update = e.update, typeof this.beforeCreate == "function" && this.beforeCreate(), this.init();
  }
  init() {
    this.isDestroyed = !1, this.updateHTMLParts();
    const t = new Date(this.date).getTime(), e = (/* @__PURE__ */ new Date()).getTime(), s = t - e, o = this.stopOnZero ? s < 0 : !1, r = {
      ...o ? c.reduce(
        (a, _) => ({ ...a, [_]: 0 }),
        {}
      ) : this.calculate(s),
      distance: Math.abs(s),
      isTimeOver: s <= 0
    };
    typeof this.beforeUpdate == "function" && this.beforeUpdate(), (!o && !this.pause || !this.timeout) && this.setHTML(r), typeof this.update == "function" && this.update(r), this.timeout || (this.timeout = setInterval(this.init.bind(this), 1e3));
  }
  calculate(t) {
    const e = {
      years: null,
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    }, s = f(t % 6e4 / 1e3), o = f(t % 36e5 / 6e4), i = f(t % 864e5 / 36e5), r = f(t % 31536e6 / 864e5), a = f(t / 31536e6);
    return this.HTMLParts.seconds && (e.seconds = s), this.HTMLParts.minutes ? e.minutes = o : e.seconds = (e.days || s) + o * 60, this.HTMLParts.hours ? e.hours = i : this.HTMLParts.minutes ? e.minutes = (e.minutes || o) + i * 60 : this.HTMLParts.seconds && (e.seconds = (e.seconds || s) + i * 60 * 60), this.HTMLParts.days ? e.days = r : this.HTMLParts.hours ? e.hours = (e.hours || i) + r * 24 : this.HTMLParts.minutes ? e.minutes = (e.minutes || o) + r * 24 * 60 : this.HTMLParts.seconds && (e.seconds = (e.seconds || s) + r * 24 * 60 * 60), this.HTMLParts.years ? e.years = a : this.HTMLParts.days ? e.days = (e.days || r) + a * 365 : this.HTMLParts.hours ? e.hours = (e.hours || i) + a * 365 * 24 : this.HTMLParts.minutes ? e.minutes = (e.minutes || o) + a * 365 * 24 * 60 : this.HTMLParts.seconds && (e.seconds = (e.seconds || s) + a * 365 * 24 * 60 * 60), e;
  }
  updateHTMLParts() {
    c.forEach((t) => {
      const e = this.element.querySelector(`[data-${t}]`);
      e && (this.HTMLParts[t] = e);
    });
  }
  setHTML(t) {
    c.forEach((e) => {
      if (!this.element)
        throw new Error(
          `${h}: Element isn't passed. Check documentation for more info. ${u}`
        );
      const s = t[e];
      if (s === null)
        return;
      const o = this.element.querySelector(`[data-${e}]`), i = l(s);
      o && o.innerHTML !== i && (o.innerHTML = i);
    });
  }
  destroy() {
    this.timeout && (clearInterval(this.timeout), this.timeout = null), c.forEach((t) => {
      if (!this.element)
        return;
      const e = this.element.querySelector(`[data-${t}]`);
      e && (e.innerHTML = "");
    }), this.isDestroyed = !0;
  }
}
const O = (n, t) => {
  if (!n || !(n instanceof Element) || !(n instanceof HTMLElement))
    throw new Error(
      `${h}: Element isn't passed. Check documentation for more info. ${u}`
    );
  if (!t || typeof t != "object" || typeof t.date != "string" && typeof t.date != "number" && !(t.date instanceof Date))
    throw new Error(`${h}: Date is invalid. Check documentation for more info. ${u}`);
  return new N(n, t);
};
O.prototype = N.prototype;
export {
  N as Timezz,
  O as timezz
};
