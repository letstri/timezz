interface IValues {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
interface IUpdateEvent extends IValues {
    distance: number;
}
interface IUserSettings {
    date: Date | string | number;
    stop?: boolean;
    canContinue?: boolean;
    beforeCreate?: () => void;
    beforeDestroy?: () => void;
    update?: (event: IUpdateEvent) => void;
}
declare class Timezz {
    private timeout;
    stop: boolean;
    canContinue: boolean;
    date: Date | string | number;
    private elements;
    beforeCreate?: () => void;
    update?: (event: IUpdateEvent) => void;
    constructor(elements: string | Element | Array<Element>, userSettings: IUserSettings);
    private checkFields;
    init(): void;
    private fixZero;
    private fixNumber;
    private setHTML;
    private getElements;
    destroy(): void;
}
declare const timezz: {
    (elements: string | HTMLElement | Array<HTMLElement>, userSettings: IUserSettings): Timezz;
    prototype: Timezz;
};
export default timezz;
