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
     * Date from and to which you want to count. Preferred `Date`.
     *
     * @type {Date | string | number}
     */
    date: DateType;
    /**
     * Is the timer can updating every second?
     *
     * @type {boolean}
     */
    pause?: boolean;
    /**
     * Should the timer continue after end of date point? Only for date in future.
     *
     * @type {boolean}
     */
    stopOnZero?: boolean;
    /**
     * The function will be called before instance initialization.
     *
     * @type {Function}
     */
    beforeCreate?: () => void;
    /**
     * The function will be called on before each second with an event.
     *
     * @type {Function}
     */
    beforeUpdate?: () => void;
    /**
     * The function will be called on each second with an event.
     *
     * @type {Function}
     */
    update?: (event: UpdateEvent) => void;
}
export declare class Timezz {
    element: Element;
    date: DateType;
    pause: boolean;
    stopOnZero: boolean;
    isDestroyed: boolean;
    beforeCreate?: () => void;
    beforeUpdate?: () => void;
    update?: (event: UpdateEvent) => void;
    private HTMLParts;
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
