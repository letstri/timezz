export = timezz;

export interface Template {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface Config {
  date: string | Date | number;
  isStopped?: boolean;
  canContinue?: boolean;
  template?: string | Template;
  beforeCreate?: () => void;
  beforeDestroy?: () => void;
  update?: () => void;
}

declare namespace timezz {
  class TimezZ {
    constructor(selector: string, config: Config);

    destroy(): void;
  }
}
