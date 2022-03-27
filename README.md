# TimezZ

> With this plugin, you can easily make a stopwatch or timer on your site. Just init, style and enjoy.

[![npm version](https://badge.fury.io/js/timezz.svg)](https://www.npmjs.com/package/timezz)
[![](https://data.jsdelivr.com/v1/package/npm/timezz/badge)](https://www.jsdelivr.com/package/npm/timezz)

## Features

- Typescript support
- Support all environments
- Easy customization
- Simple and lightweight

## Table of Contents

- [Demo](#demo)
- [Quick start](#quick-start)
  - [Install](#install)
  - [HTML](#html)
  - [Initialization](#initialization)
- [Parameters](#parameters)
  - [selector](#selector)
  - [date](#date)
  - [stop](#stop)
  - [stopOnZero](#stoponzero)
  - [beforeCreate](#beforecreate)
  - [beforeUpdate](#beforeupdate)
  - [update](#update)
- [API](#api)
  - [destroy](#destroy)
  - [init](#init)
  - [updateElements](#updateelements)
- [Interfaces](#interfaces)
  - [UpdateEvent](#updateevent)

## Demo

[Demo](https://codesandbox.io/s/nervous-flower-v1fkb)

## Quick start

### Install

We support all platforms.

#### npm

For module bundlers such as Webpack or Browserify.

```shell
npm i timezz
```

#### Include with &lt;script&gt;

Download and install with `script`.

```html
<script src="timezz.min.js"></script>
```

##### CDN

Recommended for learning purposes, you can use the latest version:

```html
<script src="https://cdn.jsdelivr.net/npm/timezz/dist/timezz.min.js"></script>
```

Recommended for production for avoiding unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/timezz@7.0.0/dist/timezz.min.js"></script>
```

For native ES Modules, there is also an ES Modules compatible build:

```html
<script type="module">
  import timezz from 'https://cdn.jsdelivr.net/npm/timezz@7.0.0/dist/timezz.min.js';
</script>
```

### HTML

Here is a base HTML markup for your timer/stopwatch. Main part of HTML are `data` attributes for render numbers of `years`, `days`, `hours`, `minutes`, `seconds`. Every `data` attribute isn't mandatory, TimezZ will recalculate time to smaller numbers.

For example: if we don't have years, a timer will add these years to days, if we don't have days, a timer will add these days to hours, and so on.

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
import timezz from 'timezz';

timezz(document.querySelector('.timer'), {
  date: new Date(),
});
```

#### Node

TimezZ as a Node.js module

```js
const timezz = require('timezz');

timezz('.timer', {
  date: new Date(),
});
```

#### Browser

Exports a global variable called `timezz`. Use it like this

```html
<script>
  timezz('.timer', {
    date: new Date(),
  });
</script>
```

#### AMD

TimezZ as an AMD module. Use with Require.js, System.js, and so on.

```js
requirejs(['timezz'], function(timezz) {
  timezz('.timer', {
    date: new Date(),
  });
});
```

---

## Parameters

Full config with filled params:

```js
timezz('.timer', {
  date: new Date(),
  pause: false,
  stopOnZero: true,
  beforeCreate() {},
  beforeDestroy() {},
  beforeUpdate(event) {},
  update(event) {},
});
```

### selector

> Note: if your DOM elements will be removed or replaced, need to call `updateElements` method.

- type: `string | HTMLElement | Array<HTMLElement>`
- required `true`

```js
// String
timezz('.timer');

// HTMLElement
timezz(document.querySelector('.timer'));

// Array of HTMLElements
timezz(document.querySelectorAll('.timer'));
```

### date

Date from and to which you want to count.

- type: `Date | string | number`
- required `true`
- preferred `Date`

```js
// Date instance
new Date('1996-05-27 03:15');

// String
'1996-05-27 03:15'

// Timestamp
833156100000
```

### pause

Is the timer on pause?

- type: `boolean`
- default: `false`
- required `false`

Can update after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.pause = true;
```

### stopOnZero

Can TimezZ continue after end of date point? Only for date in future.

- type: `boolean`
- default: `false`
- required `false`

Can update after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.stopOnZero = true;
```

### beforeCreate

The function will be called before initialization.

- type: `function`
- default: `undefined`
- required `false`

Can set after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.beforeCreate = () => {};
```

### beforeDestroy

The function will be called before destroy.

- type: `function`
- default: `undefined`
- required `false`

Can set after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.beforeDestroy = () => {};
```

### beforeUpdate

The function will be called on before each second with an event.

- type: `function`
- default: `undefined`
- required `false`

### update

The function will be called on each second with an event.

- type: `function`
- default: `undefined`
- required `false`

Here is event object which be send on each second.

```js
{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number;
  isTimeOver: boolean;
}
```

Can set after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.update = (event) => {};
```

## API

### destroy

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.destroy();
```

### init

After destroy you can init instance again.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.destroy();

setTimeout(() => {
  timer.init();
}, 1000);
```

### updateElements

If your elements were removed or replaced, you can update elements in your timezz.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

// String
timer.updateElements('.timer');

// HTMLElement
timer.updateElements(document.querySelector('.timer'));

// Array of HTMLElements
timer.updateElements(document.querySelectorAll('.timer'));
```

## Interfaces

### Timezz

```ts
import timezz, { Timezz } from 'timezz';
```

The interface can be declared as a type of instance.

```ts
const plugins: {
  timezz: Timezz,
} = {
  timezz: null,
};

plugins.timezz = timezz('.timer', { date: new Date('1996-05-25 03:15') });
```

### UpdateEvent

```ts
import { UpdateEvent } from 'timezz';
```

The interface will be sent on each call of the `update` method.

```ts
interface UpdateEvent {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number;
  isTimeOver: boolean;
}

const data: {
  info: UpdateEvent,
} = {
  info: null,
};

const timer = timezz('.timer', {
  date: new Date('1996-05-25 03:15'),
  update(event) {
    data.info = event;
  },
});
```
