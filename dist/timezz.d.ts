interface IValues {
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
declare type DateType = Date | string | number;
export interface IUpdateEvent extends IValues {
    distance: number;
    isTimeOver: boolean;
}
interface ISettings {
    date: DateType;
    stop?: boolean;
    canContinue?: boolean;
    withYears?: boolean;
    beforeCreate?: () => void;
    beforeDestroy?: () => void;
    update?: (event: IUpdateEvent) => void;
    updateElements?: () => void;
}
export declare class Timezz {
    private timeout;
    elements: Array<Element>;
    stop: boolean;
    canContinue: boolean;
    date: DateType;
    withYears: boolean;
    isDestroyed: boolean;
    beforeCreate?: () => void;
    update?: (event: IUpdateEvent) => void;
    constructor(elements: string | Element | Array<Element>, userSettings: ISettings);
    private parseDate;
    private checkFields;
    init(): void;
    private fixZero;
    private fixNumber;
    private setHTML;
    updateElements(elements: string | Element | Array<Element>): void;
    destroy(): void;
}
declare const timezz: {
    (elements: string | HTMLElement | Array<HTMLElement>, settings: ISettings): Timezz;
    prototype: Timezz;
};
export default timezz;
