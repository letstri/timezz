# TimezZ
[![npm version](https://badge.fury.io/js/timezz.svg)](https://brooons.github.io/timezz/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5294d2df6b70499eb27b25a289ce59b1)](https://www.codacy.com/app/BrooonS/timezz?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BrooonS/timezz&amp;utm_campaign=Badge_Grade)
[![](https://data.jsdelivr.com/v1/package/npm/timezz/badge)](https://www.jsdelivr.com/package/npm/timezz)

<a class="github-button" href="https://github.com/BrooonS/timezz" data-icon="octicon-star" data-show-count="true" aria-label="Star BrooonS/timezz on GitHub">Star</a>
<a class="github-button" href="https://github.com/BrooonS/timezz/subscription" data-icon="octicon-eye" data-show-count="true" aria-label="Watch BrooonS/timezz on GitHub">Watch</a>

[Docs](https://brooons.github.io/timezz/) | [Licence](https://github.com/BrooonS/timezz/blob/master/LICENSE)

> With this plugin you can easily include the timer on your site, his works both ways.

## Example

<iframe src="https://codesandbox.io/embed/w638mz6q68?autoresize=1&fontsize=14&hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Quick start

Install with [npm](https://www.npmjs.com/package/timezz).

```sh
npm i timezz
```

or download and install with `script`.

```html
<script src="timezz.min.js"></script>
```

or cdn

```html
<!-- Latest -->
<script src="https://cdn.jsdelivr.net/npm/timezz/dist/timezz.min.js"></script>

<!-- With version -->
<script src="https://cdn.jsdelivr.net/npm/timezz@5.0.0/dist/timezz.min.js"></script>
```

**Initialization**
```js
new TimezZ('.j-timer');
```

**Example Styling**
```css
.timer {
  font-size: 70px;
}

.timer span {
  color: #555;
}

.timer i {
  color: #bbb;
  font-size: 40px;
}
```

## Config

```js
new TimezZ('.j-timer', {
  date: 'January 1, 2040 00:00:00',
  daysName: 'd',
  hoursName: 'h',
  minutesName: 'm',
  secondsName: 's',
  isStopped: false,
  template: '<span>NUMBER<i>LETTER</i></span> ',
  beforeCreate() {},
  finished() {},
});
```

| Param         | type                | Default                             | Description |
|---------------|---------------------|-------------------------------------|---|
| date          | `string` or `Date`  | `January 1, 2040 00:00:00`          | the date to or from which need count |
| daysName      | `string`            | `d`                                 | How to name days |
| hoursName     | `string`            | `h`                                 | How to name hours |
| minutesName   | `string`            | `m`                                 | How to name minutes |
| secondsName   | `string`            | `s`                                 | How to name seconds |
| secondsName   | `string`            | `s`                                 | How to name seconds |
| isStopped     | `boolean`           | `false`                             | The timer is stopped at start |
| template      | `string`            | `<span>NUMBER<i>LETTER</i></span> ` | Template to display tags, `NUMBER` and `LETTER` will be replace in number and letter in counting |
| beforeCreate  | `function`          | `null`                                | Callback which be started when the timer will be created |
| beforeDestroy | `function`          | `null`                                | Callback which be started before timer destroy |
| finished      | `function`          | `null`                                | Callback which be started when the timer will be finished counting |


## API

### destroy

```js
const timer = new TimezZ('.j-timer', {
  beforeDestroy() {
    alert('destroyed');
  },
});

timer.destroy();
```

### Version

```js
const timer = new TimezZ('.j-timer');

timer.version();
// => 5.0.0
```

&copy; Valery Strelets
