# TimezZ

> With this plugin, you can easily make a stopwatch or timer on your site. Just init, style and enjoy.

[![npm version](https://badge.fury.io/js/timezz.svg)](https://www.npmjs.com/package/timezz)
[![](https://data.jsdelivr.com/v1/package/npm/timezz/badge)](https://www.jsdelivr.com/package/npm/timezz)

## Features

- Typescript support
- Support all environments
- Easy customization
- Simple and lightweight

## Demo

[Demo](https://codesandbox.io/s/nervous-flower-v1fkb)

## Quick start

### Install

```shell
npm i timezz
```

#### CDN

For native ES Modules, there is also an ES Modules compatible build:

```html
<script type="module">
  import timezz from 'https://cdn.jsdelivr.net/npm/timezz@9.0.2/+esm';
</script>
```

### HTML

Here is a base HTML markup for your timer/stopwatch. Main part of HTML are `data` attributes for render numbers of `years`, `days`, `hours`, `minutes`, `seconds`. Every `data` attribute isn't mandatory, TimezZ will recalculate time to smaller numbers.

For example:
 - if you don't have years, a timer will add these years to days
 - if you don't have days, a timer will add these days to hours
 - and so on

```html
<div class="timer">
  Years: <div data-years></div>
  Days: <div data-days></div>
  Hours: <div data-hours></div>
  Minutes: <div data-minutes></div>
  Seconds: <div data-seconds></div>
</div>
```

### Initialization

#### ES6

TimezZ as an ES6 module.

```js
import timezz from 'timezz'

timezz(document.querySelector('.timer'), {
  date: new Date(),
})
```

---

## Parameters

Full config with filled params:

```ts
timezz(document.querySelector('.timer'), {
  date: new Date(),
  pause: false,
  stopOnZero: true,
  beforeCreate() {},
  beforeUpdate() {},
  update(event) {},
})
```

### element

- type: `HTMLElement`
- required `true`

```ts
timezz(document.querySelector('.timer'), { date: new Date() })
```

### date

Date from and to which you want to count. Preferred `Date`.

- type: `Date | string | number`
- required `true`

```ts
// Date instance
new Date('1996-05-27 03:15')

// String
'1996-05-27 03:15'

// Timestamp
833156100000
```

### pause

Is the timer can updating every second?

- type: `boolean`
- default: `false`
- required `false`

Can update after initialization.

```ts
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
})

timer.pause = true
```

### stopOnZero

Should the timer continue after end of date point? Only for date in future.

- type: `boolean`
- default: `true`
- required `false`

Can update after initialization.

```ts
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
})

timer.stopOnZero = false
```

### beforeCreate

The function will be called before instance initialization

- type: `function`
- default: `undefined`
- required `false`

Can set after initialization.

```ts
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
})

timer.beforeCreate = () => {}
```

### beforeUpdate

The function will be called on before each second with an event.

- type: `function`
- default: `undefined`
- required `false`

Can set after initialization.

```ts
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
})

timer.beforeUpdate = () => {}
```

### update

The function will be called on each second with an event.

- type: `function`
- default: `undefined`
- required `false`

Can set after initialization.

```ts
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
})

timer.update = (event) => {}
```

## API

### destroy

```ts
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
})

timer.destroy()
```

### init

After destroy you can init instance again.

```ts
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
})

timer.destroy()

setTimeout(() => {
  timer.init()
}, 1000)
```

## Interfaces

### Timezz

The interface can be declared as a type of instance.

```ts
import timezz, { Timezz } from 'timezz'

const plugins: {
  timezz: Timezz
} = {
  timezz: null,
}

plugins.timezz = timezz(document.querySelector('.timer'), { date: new Date('1996-05-27 03:15') })
```

### UpdateEvent

The interface will be sent on each call of the `update` method.

```ts
import { UpdateEvent } from 'timezz'

const data: {
  info: UpdateEvent | null
} = {
  info: null,
}

const timer = timezz(document.querySelector('.timer'), {
  date: new Date('1996-05-27 03:15'),

  update(event) {
    data.info = event
  },
})
```

## React

```tsx
import type { UpdateEvent } from 'timezz'
import { Timezz } from 'timezz/react'

export default function App() {
  function onUpdate(event: UpdateEvent) {
    console.log(event)
  }

  return (
    <Timezz
      date={new Date('2026-01-01')}
      pause={false}
      stopOnZero={true}
      onUpdate={onUpdate}
    >
      <div>
        Years:
        <div data-years></div>
      </div>
      <div>
        Days:
        <div data-days></div>
      </div>
      <div>
        Hours:
        <div data-hours></div>
      </div>
      <div>
        Minutes:
        <div data-minutes></div>
      </div>
      <div>
        Seconds:
        <div data-seconds></div>
      </div>
    </Timezz>
  )
}
```

## Vue

```vue
<script setup lang="ts">
import type { UpdateEvent } from 'timezz'
import { Timezz } from 'timezz/vue'

function onUpdate(event: UpdateEvent) {
  console.log(event)
}
</script>

<template>
  <Timezz
    :date="new Date('2026-01-01')"
    :pause="false"
    :stop-on-zero="true"
    @update="onUpdate"
  >
    <div>
      Years:
      <div data-years />
    </div>
    <div>
      Days:
      <div data-days />
    </div>
    <div>
      Hours:
      <div data-hours />
    </div>
    <div>
      Minutes:
      <div data-minutes />
    </div>
    <div>
      Seconds:
      <div data-seconds />
    </div>
  </Timezz>
</template>
```
