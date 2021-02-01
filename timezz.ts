interface IValues {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type UserDate = Date | string | number;

export interface IUpdateEvent extends IValues {
  distance: number;
  isTimeOver: boolean;
}

interface ISettings {
  date: UserDate;
  stop?: boolean;
  canContinue?: boolean;
  withYears?: boolean,
  beforeCreate?: () => void;
  beforeDestroy?: () => void;
  update?: (event: IUpdateEvent) => void;
  updateElements?: () => void;
}

const TIMEZZ = '[TimezZ]';
const REPOSITORY = 'https://github.com/BrooonS/timezz';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

const values: Array<keyof IValues> = ['years', 'days', 'hours', 'minutes', 'seconds'];

class Timezz {
  private timeout!: any;

  public elements: Array<Element> = [];

  public stop!: boolean;

  public canContinue!: boolean;

  public date!: UserDate;

  public withYears!: boolean;

  public isDestroyed = false;

  public beforeCreate?: () => void;

  public update?: (event: IUpdateEvent) => void;

  constructor(elements: string | Element | Array<Element>, userSettings: ISettings) {
    this.updateElements(elements);

    this.checkFields(userSettings);

    this.date = userSettings.date;
    this.stop = userSettings.stop || false;
    this.canContinue = userSettings.canContinue || false;
    this.withYears = userSettings.withYears || false;
    this.beforeCreate = userSettings.beforeCreate;
    this.update = userSettings.update;

    if (typeof this.beforeCreate === 'function') {
      this.beforeCreate();
    }

    this.init();
  }

  private checkFields = (settings: ISettings) => {
    const warn = (field: keyof ISettings, types: Array<string>) => {
      if (settings[field] !== undefined && types.length) {
        // eslint-disable-next-line no-console
        console.warn(
          `${TIMEZZ}:`,
          `Parameter '${field}' should be ${types.length > 1 ? 'one of the types' : 'the type'}: ${types.join(', ')}.`,
          this.elements.length > 1 ? this.elements : this.elements[0],
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

  public init() {
    this.isDestroyed = false;

    const countDate = new Date(this.date).getTime();
    const currentTime = new Date().getTime();
    const distance = countDate - currentTime;
    const canContinue = this.canContinue || distance > 0;

    const countYears = canContinue && this.withYears ? this.fixNumber(distance / ONE_YEAR) : 0;
    const countDays = canContinue
      ? this.fixNumber(countYears === 0 ? distance / ONE_DAY : (distance % ONE_YEAR) / ONE_DAY)
      : 0;
    const countHours = canContinue ? this.fixNumber((distance % ONE_DAY) / ONE_HOUR) : 0;
    const countMinutes = canContinue ? this.fixNumber((distance % ONE_HOUR) / ONE_MINUTE) : 0;
    const countSeconds = canContinue ? this.fixNumber((distance % ONE_MINUTE) / ONE_SECOND) : 0;

    const info = {
      years: countYears,
      days: countDays,
      hours: countHours,
      minutes: countMinutes,
      seconds: countSeconds,
      distance: Math.abs(distance),
      isTimeOver: distance <= 0,
    };

    if ((canContinue && !this.stop) || !this.timeout) {
      this.setHTML(info);
    }

    if (typeof this.update === 'function') {
      this.update(info);
    }

    if (!this.timeout) {
      this.timeout = setInterval(this.init.bind(this), ONE_SECOND);
    }
  }

  private fixZero = (number: number) => (number >= 10 ? `${number}` : `0${number}`);

  private fixNumber = (math: number) => Math.floor(Math.abs(math));

  private setHTML(updateInfo: IUpdateEvent) {
    this.elements.forEach((element) => {
      values.forEach((value: string) => {
        const block = element.querySelector(`[data-${value}]`);
        const number = this.fixZero(updateInfo[value as keyof IValues]);

        if (block && block.innerHTML !== number) {
          block.innerHTML = number;
        }
      });
    });
  }

  public updateElements(elements: string | Element | Array<Element> = []) {
    // For Node.js env
    try {
      if (typeof elements === 'string') {
        this.elements = Array.from(document.querySelectorAll(elements));
      } else if (
        (Array.isArray(elements) || elements instanceof NodeList)
        && Array.from(elements).every((element) => element instanceof HTMLElement)
      ) {
        this.elements = Array.from(elements as Array<Element>);
      } else if (elements instanceof HTMLElement) {
        this.elements = [elements];
      }
    } catch (e) {
      //
    }
  }

  public destroy() {
    if (this.timeout) {
      clearInterval(this.timeout);
      this.timeout = null;
    }

    this.elements.forEach((element) => {
      values.forEach((value: string) => {
        const block = element.querySelector(`[data-${value}]`);

        if (block) {
          block.innerHTML = '';
        }
      });
    });

    this.isDestroyed = true;
  }
}

const timezz = (
  elements: string | HTMLElement | Array<HTMLElement>,
  settings: ISettings,
): Timezz => {
  if (elements === undefined) {
    throw new Error(`${TIMEZZ}: Elements aren't passed. Check documentation for more info. ${REPOSITORY}`);
  }

  if (!settings || typeof settings !== 'object' || Number.isNaN(new Date(settings.date).getTime())) {
    throw new Error(`${TIMEZZ}: Date isn't valid or invalid. Check documentation for more info. ${REPOSITORY}`);
  }

  return new Timezz(elements, settings);
};

timezz.prototype = Timezz.prototype;

export default timezz;
