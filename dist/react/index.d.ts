import type { FC, HTMLAttributes } from 'react';
import type { Settings } from '../native/index.js';






interface TimezzProps extends HTMLAttributes<HTMLDivElement> {
    date: Settings['date'];
    pause: Settings['pause'];
    stopOnZero: Settings['stopOnZero'];
    withYears: Settings['withYears'];
    onUpdate: Settings['update'];
}
declare const Timezz: FC<TimezzProps>;

export { Timezz };
