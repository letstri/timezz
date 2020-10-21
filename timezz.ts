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
  private timeout!: any;

  beforeCreate?: (settings: ISettings) => void;

  beforeDestroy?: () => void;

  update?: (event: IUpdateEvent) => void;

  elements!: Array<Element>;

  settings!: ISettings;

  constructor(elements: Array<Element>, userSettings: IUserSettings) {
    this.elements = elements;
    this.checkFields(userSettings);
    this.settings = {
      date: userSettings.date,
      stop: userSettings.stop || false,
      canContinue: userSettings.canContinue || false,
    };

    if (typeof this.beforeCreate === 'function') {
      this.beforeCreate(this.settings);
    }

    this.initTimer();
  }

  private checkFields = (settings: IUserSettings) => {
    const warn = (field: keyof IUserSettings, types: Array<string>) => {
      if (settings[field] !== undefined && types.length) {
        // eslint-disable-next-line no-console
        console.warn(
          `${TIMEZZ}:`,
          `Parameter '${field}' should be ${types.length > 1 ? 'one of the types' : 'the type'}: ${types.join(', ')}.`,
          this.elements,
        );
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

  private fixNumber = (math: number) => {
    const fixZero = (number: number) => (number >= 10 ? `${number}` : `0${number}`);

    return fixZero(Math.floor(Math.abs(math)));
  };

  private initTimer() {
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

    this.elements.forEach((element, index) => {
      this.elements[index].innerHTML = (
        this.formatHTML(canContinue ? countDays : 0, 'days', updateEvent)
        + this.formatHTML(canContinue ? countHours : 0, 'hours', updateEvent)
        + this.formatHTML(canContinue ? countMinutes : 0, 'minutes', updateEvent)
        + this.formatHTML(canContinue ? countSeconds : 0, 'seconds', updateEvent)
      );
    });

    if (typeof this.update === 'function') {
      this.update(updateEvent);
    }

    if (!this.timeout && !this.settings.stop && canContinue) {
      this.timeout = setTimeout(this.initTimer.bind(this), ONE_SECOND);
    }
  }

  private formatHTML(number: string | number, text: keyof ITemplate, event: IUpdateEvent) {
    const replace = (string: string) => String(string)
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

  public destroy() {
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

const timezz = (
  elements: string | HTMLElement | Array<HTMLElement>,
  userSettings: IUserSettings,
): Timezz => {
  let items: Array<Element> = [];

  // For Node.js env
  try {
    if (typeof elements === 'string') {
      items = Array.from(document.querySelectorAll(elements));
    } else if (
      (Array.isArray(elements) || elements instanceof NodeList)
      && Array.from(elements).every((element) => element instanceof HTMLElement)
    ) {
      items = Array.from(elements as Array<Element>);
    } else if (elements instanceof HTMLElement) {
      items = [elements];
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`${TIMEZZ}: Elements not found. Check documentation for more info. https://github.com/BrooonS/timezz`);
  }

  if (Number.isNaN(new Date(userSettings.date).getTime())) {
    throw new Error(`${TIMEZZ}: Date isn't valid. Check documentation for more info. https://github.com/BrooonS/timezz`);
  }

  return new Timezz(items, userSettings);
};

timezz.prototype = Timezz.prototype;

export default timezz;
