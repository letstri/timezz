import { FC, HTMLAttributes } from 'react';
import { Settings } from '../native/index.js';

interface TimezzProps extends HTMLAttributes<HTMLDivElement> {
    date: Settings['date'];
    pause: Settings['pause'];
    stopOnZero: Settings['stopOnZero'];
    onUpdate: Settings['update'];
}
declare const Timezz: FC<TimezzProps>;

export { Timezz };
