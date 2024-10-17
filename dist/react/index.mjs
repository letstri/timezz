import { useRef, useEffect, createElement } from 'react';
import { timezz } from '../native/index.mjs';

const Timezz = ({
  date,
  pause,
  stopOnZero,
  onUpdate,
  children,
  ...props
}) => {
  const element = useRef(null);
  const timezzInstance = useRef(null);
  useEffect(() => {
    timezzInstance.current = timezz(element.current, {
      date,
      pause,
      stopOnZero,
      update: onUpdate
    });
    return () => {
      timezzInstance.current?.destroy();
    };
  }, [date, pause, stopOnZero, onUpdate]);
  useEffect(() => {
    if (timezzInstance.current) {
      timezzInstance.current.pause = pause ?? timezzInstance.current.pause;
      timezzInstance.current.stopOnZero = stopOnZero ?? timezzInstance.current.stopOnZero;
      timezzInstance.current.date = date ?? timezzInstance.current.date;
      timezzInstance.current.update = onUpdate ?? timezzInstance.current.update;
    }
  }, [date, pause, stopOnZero, onUpdate]);
  return createElement("div", { ref: element, ...props }, children);
};

export { Timezz };
