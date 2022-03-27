interface PartNames {
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
declare type DateType = Date | string | number;
export interface UpdateEvent {
    years: number | null;
    days: number | null;
    hours: number | null;
    minutes: number | null;
    seconds: number | null;
    distance: number;
    isTimeOver: boolean;
}
interface Settings {
    /**
     * Date from and to which you want to count.
     */
    date: DateType;
    /**
     * Is the timer on pause?
     */
    pause?: boolean;
    /**
     * Can TimezZ continue after end of date point? Only for date in future.
     */
    stopOnZero?: boolean;
    /**
     * The function will be called before initialization.
     */
    beforeCreate?: () => void;
    /**
     * The function will be called before destroy.
     */
    beforeDestroy?: () => void;
    /**
     * The function will be called on before each second with an event.
     */
    beforeUpdate?: () => void;
    /**
     * The function will be called on each second with an event.
     */
    update?: (event: UpdateEvent) => void;
}
export declare class Timezz {
    date: DateType;
    element: Element;
    pause: boolean;
    stopOnZero: boolean;
    isDestroyed: boolean;
    HTMLParts: Record<keyof PartNames, Element | null>;
    beforeCreate?: () => void;
    beforeUpdate?: () => void;
    update?: (event: UpdateEvent) => void;
    private timeout;
    constructor(element: Element, userSettings: Settings);
    private checkFields;
    init(): void;
    private calculate;
    private updateHTMLParts;
    private setHTML;
    destroy(): void;
}
declare const timezz: {
    (element: HTMLElement | Element, settings: Settings): Timezz;
    prototype: Timezz;
};
export default timezz;
