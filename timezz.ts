const TIMEZZ = '[TimezZ]';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

const DEFAULT_TEMPLATE = '<span>[NUMBER] <i>[TEXT]</i></span> ';

interface IUpdateEvent {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number;
}

interface ITemplate {
  days?: string | ((event: IUpdateEvent) => string);
  hours?: string | ((event: IUpdateEvent) => string);
  minutes?: string | ((event: IUpdateEvent) => string);
  seconds?: string | ((event: IUpdateEvent) => string);
}

interface ISettings {
  date: Date | string | number;
  stop: boolean;
  canContinue: boolean;
  template: string | ITemplate | ((event: IUpdateEvent) => string);
}

interface IUserSettings {
  date: Date | string | number;
  stop?: boolean;
  canContinue?: boolean;
  template?: string | ITemplate | ((event: IUpdateEvent) => string);
}

class Timezz {
  elements!: Array<Element>;

  settings!: ISettings;

  timeout!: any;

  beforeCreate?: (settings: ISettings) => void;

  beforeDestroy?: () => void;

  update?: (event: IUpdateEvent) => void;

  constructor(elements: Array<Element> = [], userSettings: IUserSettings) {
    this.elements = elements;
    this.checkFields(userSettings);
    this.settings = {
      date: userSettings.date,
      stop: userSettings.stop || false,
      canContinue: userSettings.canContinue || false,
      template: userSettings.template || DEFAULT_TEMPLATE,
    };

    if (typeof this.beforeCreate === 'function') {
      this.beforeCreate(this.settings);
    }

    this.initTimer();
  }

  checkFields = (settings: IUserSettings) => {
    const warn = (field: keyof IUserSettings, types: Array<string>) => {
      if (settings[field] !== undefined && types.length) {
        // eslint-disable-next-line no-console
        console.warn(`${TIMEZZ}: '${field}' should be ${types.length > 1 ? 'one of the types' : 'the type'}: ${types.join(', ')}.`);
      }
    };

    if (
      !(settings.date instanceof Date)
      && typeof settings.date !== 'string'
      && typeof settings.date !== 'number'
    ) {
      warn('date', ['Date', 'string', 'number']);
    }

    if (typeof settings.stop !== 'boolean') {
      warn('stop', ['boolean']);
    }

    if (typeof settings.canContinue !== 'boolean') {
      warn('canContinue', ['boolean']);
    }

    if (
      typeof settings.template !== 'string'
      && typeof settings.template !== 'object'
      && typeof settings.template !== 'function'
    ) {
      warn('template', ['string', 'function', `{
        days?: string | function,
        hours?: string | function,
        minutes?: string | function,
        seconds?: string | function,
      }`]);
    }
  };

  fixNumber = (math: number) => {
    const fixZero = (number: number) => (number >= 10 ? `${number}` : `0${number}`);

    return fixZero(Math.floor(Math.abs(math)));
  };

  initTimer() {
    const countDate = new Date(this.settings.date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;
    const canContinue = this.settings.canContinue || distance > 0;

    const countDays = this.fixNumber(distance / ONE_DAY);
    const countHours = this.fixNumber((distance % ONE_DAY) / ONE_HOUR);
    const countMinutes = this.fixNumber((distance % ONE_HOUR) / ONE_MINUTE);
    const countSeconds = this.fixNumber((distance % ONE_MINUTE) / ONE_SECOND);

    const updateEvent = {
      days: Number(countDays),
      hours: Number(countHours),
      minutes: Number(countMinutes),
      seconds: Number(countSeconds),
      distance: Math.abs(distance),
    };

    if (typeof this.update === 'function') {
      this.update(updateEvent);
    }

    this.elements.forEach((element, index) => {
      this.elements[index].innerHTML = (
        this.formatHTML(canContinue ? countDays : 0, 'days', updateEvent)
        + this.formatHTML(canContinue ? countHours : 0, 'hours', updateEvent)
        + this.formatHTML(canContinue ? countMinutes : 0, 'minutes', updateEvent)
        + this.formatHTML(canContinue ? countSeconds : 0, 'seconds', updateEvent)
      );
    });

    if (!this.settings.stop && canContinue) {
      this.timeout = setTimeout(this.initTimer.bind(this), ONE_SECOND);
    }
  }

  formatHTML(number: string | number, text: keyof ITemplate, event: IUpdateEvent) {
    const replace = (string: string) => string
      .replace(/\[NUMBER]/gi, number.toString())
      .replace(/\[TEXT]/gi, text);

    if (typeof this.settings.template === 'object') {
      if (typeof this.settings.template[text] === 'function') {
        return replace((this.settings.template[text] as any)(event) ?? DEFAULT_TEMPLATE);
      }

      return replace(this.settings.template[text] as string ?? DEFAULT_TEMPLATE);
    }

    if (typeof this.settings.template === 'function') {
      return replace(this.settings.template(event));
    }

    return replace(this.settings.template);
  }

  destroy() {
    if (typeof this.beforeDestroy === 'function') {
      this.beforeDestroy();
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.elements.forEach((element, index) => {
      this.elements[index].innerHTML = '';
    });
    this.elements = [];
  }
}

const timezz = (selector: string, userSettings: IUserSettings): Timezz => {
  const elements = Array.from(document.querySelectorAll(selector));

  if (Number.isNaN(new Date(userSettings.date).getTime())) {
    throw new Error(`${TIMEZZ}: Date isn't valid. Check documentation for more info. https://github.com/BrooonS/timezz`);
  }

  if (elements.length === 0) {
    throw new Error(`${TIMEZZ}: Selector elements not found. Check documentation for more info. https://github.com/BrooonS/timezz`);
  }

  return new Timezz(elements, userSettings);
};

timezz.prototype = Timezz.prototype;

export default timezz;
