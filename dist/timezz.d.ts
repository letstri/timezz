interface IValues {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
interface IUpdateEvent extends IValues {
    distance: number;
    elements: Array<Element>;
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
    private stop;
    private canContinue;
    date: Date | string | number;
    elements: Array<Element>;
    beforeCreate?: () => void;
    update?: (event: IUpdateEvent) => void;
    constructor(elements: Array<Element>, userSettings: IUserSettings);
    private checkFields;
    init(): void;
    private fixZero;
    private fixNumber;
    private setHTML;
    destroy(): void;
}
declare const timezz: {
    (elements: string | HTMLElement | Array<HTMLElement>, userSettings: IUserSettings): Timezz;
    prototype: Timezz;
};
export default timezz;
