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
    private timeout;
    beforeCreate?: (settings: ISettings) => void;
    beforeDestroy?: () => void;
    update?: (event: IUpdateEvent) => void;
    elements: Array<Element>;
    settings: ISettings;
    constructor(elements: Array<Element>, userSettings: IUserSettings);
    private checkFields;
    private fixNumber;
    private initTimer;
    private formatHTML;
    destroy(): void;
}
declare const timezz: {
    (elements: string | HTMLElement | Array<HTMLElement>, userSettings: IUserSettings): Timezz;
    prototype: Timezz;
};
export default timezz;
