interface IValues {
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
declare type UserDate = Date | string | number;
export interface IUpdateEvent extends IValues {
    distance: number;
    isTimeOver: boolean;
}
interface ISettings {
    date: UserDate;
    stop?: boolean;
    canContinue?: boolean;
    withYears?: boolean;
    beforeCreate?: () => void;
    beforeDestroy?: () => void;
    update?: (event: IUpdateEvent) => void;
    updateElements?: () => void;
}
declare class Timezz {
    private timeout;
    elements: Array<Element>;
    stop: boolean;
    canContinue: boolean;
    date: UserDate;
    withYears: boolean;
    isDestroyed: boolean;
    beforeCreate?: () => void;
    update?: (event: IUpdateEvent) => void;
    constructor(elements: string | Element | Array<Element>, userSettings: ISettings);
    private checkFields;
    init(): void;
    private fixZero;
    private fixNumber;
    private setHTML;
    updateElements(elements?: string | Element | Array<Element>): void;
    destroy(): void;
}
declare const timezz: {
    (elements: string | HTMLElement | Array<HTMLElement>, settings: ISettings): Timezz;
    prototype: Timezz;
};
export default timezz;
