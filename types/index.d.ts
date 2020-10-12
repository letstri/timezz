export = timezz;

declare function timezz(selector: string, userSettings: timezz.ISettings): timezz.Timezz;

declare namespace timezz {
  export interface ISettings {
    date: Date | string | number;
    texts: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    isStopped: boolean;
    canContinue: boolean;
    template: string;
    beforeCreate: (settings: ISettings) => void | null;
    beforeDestroy: () => void | null;
    update: (event: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      distance: number;
    }) => void | null;
  }

  class Timezz {
    constructor(elements: Array<HTMLElement>, userSettings: timezz.ISettings);

    fixNumber(number: number): string;

    initTimer(): void;

    formatHTML(number: string, text: string): string;

    destroy(): void;
  }
}
