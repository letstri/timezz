# TimezZ

[![npm version](https://badge.fury.io/js/timezz.svg)](https://BrooonS.github.io/timezz/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5294d2df6b70499eb27b25a289ce59b1)](https://www.codacy.com/app/BrooonS/timezz?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BrooonS/timezz&amp;utm_campaign=Badge_Grade)
[![](https://data.jsdelivr.com/v1/package/npm/timezz/badge)](https://www.jsdelivr.com/package/npm/timezz)

> With this plugin you can easily make a stopwatch or timer.

## Features

- Typescript support
- Support all environments
- Easy customization
- Simple and lightweight

## Demo

<iframe src="https://codesandbox.io/embed/w638mz6q68?autoresize=1&fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Quick start

### Install

We are support all platforms.

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

Recommend for learning purposes, you can use the latest version:

```html
<script src="https://cdn.jsdelivr.net/npm/timezz/dist/timezz.min.js"></script>
```

Recommend for production for avoiding unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/timezz@6.0.0/dist/timezz.min.js"></script>
```

For native ES Modules, there is also an ES Modules compatible build:

```html
<script type="module">
  import timezz from 'https://cdn.jsdelivr.net/npm/timezz@6.0.0/dist/timezz.min.js';
</script>
```

### HTML

Here is a base HTML markup for your timer/stopwatch. Main part of HTML are `data` attributes for render numbers of `days`, `hours`, `minutes`, `seconds`.

```html
<div class="timer">
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

timezz(document.querySelector('.timer'), {
  date: new Date(),
});
```

#### Browser

Exports a global variable called `timezz`. Use it like this

```html
<script>
  timezz(document.querySelector('.timer'), {
    date: new Date(),
  });
</script>
```

#### AMD

TimezZ as an AMD module. Use with Require.js, System.js, and so on.

```js
requirejs(['timezz'], function(timezz) {
  timezz(document.querySelector('.timer'), {
    date: new Date(),
  });
});
```

---

## Params

Full config with filled params:

```js
timezz(document.querySelector('.timer'), {
  date: new Date(),
  stop: false,
  canContinue: true,
  beforeCreate() {},
  beforeDestroy() {},
  update(event) {},
});
```

### date

The date to set as first param to or from which need count.

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

The timer is stopped at start.

- type: `boolean`
- default: `false`
- required `false`

### canContinue

Can TimezZ continue after end of date point (for stopwatch).

- type: `boolean`
- default: `true`
- required `false`


### beforeCreate

Function will be executed before initialization.

- type: `function`
- default: `undefined`
- required `false`

Can set after initialization.

```js
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
});

timer.beforeCreate = function() {}
```

### update

Function will be executed on each second with event.

- type: `function`
- default: `undefined`
- required `false`

Event object which be send on each second.

```js
{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  distance: number;
  elements: Array<Element>;
}
```

Can set after initialization.

```js
const timer = timezz(document.querySelector('.timer'), {
  date: new Date(),
});

timer.update = function(event) {}
```

## API

### destroy

```js
const timer = timezz('.j-timer', {
  date: new Date(),
});

timer.destroy();
```
