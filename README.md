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
  - [canContinue](#cancontinue)
  - [withYears](#withyears)
  - [beforeCreate](#beforecreate)
  - [update](#update)
- [API](#api)
  - [destroy](#destroy)
  - [init](#init)

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
<script src="https://cdn.jsdelivr.net/npm/timezz@6.0.5/dist/timezz.min.js"></script>
```

For native ES Modules, there is also an ES Modules compatible build:

```html
<script type="module">
  import timezz from 'https://cdn.jsdelivr.net/npm/timezz@6.0.5/dist/timezz.min.js';
</script>
```

### HTML

Here is a base HTML markup for your timer/stopwatch. Main part of HTML are `data` attributes for render numbers of `years`, `days`, `hours`, `minutes`, `seconds`.

```html
<div class="timer">
  Years: <div data-years></div> <!-- Works only with parameter `withYears: true` -->
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

timezz('.timer', {
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
  stop: false,
  canContinue: true,
  withYears: false,
  beforeCreate() {},
  beforeDestroy() {},
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

```js
// Date instance
new Date('1996-05-27 03:15');

// String
'1996-05-27 03:15'

// Timestamp
833156100000
```

### stop

Is the timer stopped?

- type: `boolean`
- default: `false`
- required `false`

Can update after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.stop = true;
```

### canContinue

Can TimezZ continue after end of date point?

- type: `boolean`
- default: `false`
- required `false`

Can update after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.canContinue = true;
```

### withYears

> Note: if the property is enabled, the days will be counted differently.

Do you want to count the years?

- type: `boolean`
- default: `false`
- required `false`

Can update after initialization.

```js
const timer = timezz('.timer', {
  date: new Date(),
});

timer.withYears = true;
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

timer.beforeCreate = function() {}
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

timer.beforeDestroy = function() {}
```

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

timer.update = function(event) {}
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
