import { createElement, type FC, type HTMLAttributes, useEffect, useRef } from 'react'
import { type Settings, timezz, type Timezz as TimezzType } from '../native'

interface TimezzProps extends HTMLAttributes<HTMLDivElement> {
  date: Settings['date']
  pause: Settings['pause']
  stopOnZero: Settings['stopOnZero']
  onUpdate: Settings['update']
}

export const Timezz: FC<TimezzProps> = ({
  date,
  pause,
  stopOnZero,
  onUpdate,
  children,
  ...props
}) => {
  const element = useRef<HTMLDivElement>(null)
  const timezzInstance = useRef<TimezzType | null>(null)

  useEffect(() => {
    timezzInstance.current = timezz(element.current!, {
      date,
      pause,
      stopOnZero,
      update: onUpdate,
    })

    return () => {
      timezzInstance.current?.destroy()
    }
  }, [date, pause, stopOnZero, onUpdate])

  useEffect(() => {
    if (timezzInstance.current) {
      timezzInstance.current.pause = pause ?? timezzInstance.current.pause
      timezzInstance.current.stopOnZero = stopOnZero ?? timezzInstance.current.stopOnZero
      timezzInstance.current.date = date ?? timezzInstance.current.date
      timezzInstance.current.update = onUpdate ?? timezzInstance.current.update
    }
  }, [date, pause, stopOnZero, onUpdate])

  return createElement('div', { ref: element, ...props }, children)
}
