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
declare class Timezz {
    elements: Array<Element>;
    settings: ISettings;
    timeout: any;
    beforeCreate?: (settings: ISettings) => void;
    beforeDestroy?: () => void;
    update?: (event: IUpdateEvent) => void;
    constructor(elements: Element[] | undefined, userSettings: IUserSettings);
    checkFields: (settings: IUserSettings) => void;
    fixNumber: (math: number) => string;
    initTimer(): void;
    formatHTML(number: string | number, text: keyof ITemplate, event: IUpdateEvent): string;
    destroy(): void;
}
declare const timezz: {
    (selector: string, userSettings: IUserSettings): Timezz;
    prototype: Timezz;
};
export default timezz;
