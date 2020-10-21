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
    private stop;
    private canContinue;
    date: Date | string | number;
    beforeCreate?: () => void;
    beforeDestroy?: () => void;
    update?: (event: IUpdateEvent) => void;
    elements: Array<Element>;
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
