/**
 * TimezZ - with this plugin you can easily make a stopwatch or timer.
 *
 * @author Valery Strelets
 * @see https://github.com/BrooonS/TimezZ
 * @license https://github.com/BrooonS/timezz/blob/master/LICENSE
 */
interface ITemplate {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}
interface ISettings {
    date: Date | string | number;
    texts: {
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
    };
    isStopped: boolean;
    canContinue: boolean;
    template: string | ITemplate;
    beforeCreate?: (settings: ISettings) => void;
    beforeDestroy?: () => void;
    update?: (event: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        distance: number;
    }) => void;
}
interface IUserSettings {
    date: Date | string | number;
    texts?: {
        days: string;
        hours: string;
        minutes: string;
        seconds: string;
    };
    isStopped?: boolean;
    canContinue?: boolean;
    template?: string | ITemplate;
    beforeCreate?: (settings: ISettings) => void;
    beforeDestroy?: () => void;
    update?: (event: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        distance: number;
    }) => void;
}
declare class Timezz {
    elements: Array<Element>;
    settings: ISettings;
    timeout: number;
    constructor(elements: Element[] | undefined, userSettings: IUserSettings);
    fixNumber: (math: number) => string;
    initTimer(): void;
    formatHTML(number: string, text: keyof ISettings['texts']): string;
    destroy(): void;
}
declare const timezz: {
    (selector: string, userSettings: IUserSettings): Timezz;
    prototype: Timezz;
};
export default timezz;
