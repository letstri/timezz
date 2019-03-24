# TimezZ
[![npm version](https://badge.fury.io/js/timezz.svg)](https://brooons.github.io/timezz/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5294d2df6b70499eb27b25a289ce59b1)](https://www.codacy.com/app/BrooonS/timezz?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BrooonS/timezz&amp;utm_campaign=Badge_Grade)
[![](https://data.jsdelivr.com/v1/package/npm/timezz/badge)](https://www.jsdelivr.com/package/npm/timezz)

<a class="github-button" href="https://github.com/BrooonS/timezz" data-icon="octicon-star" data-show-count="true" aria-label="Star BrooonS/timezz on GitHub">Star</a>
<a class="github-button" href="https://github.com/BrooonS/timezz/subscription" data-icon="octicon-eye" data-show-count="true" aria-label="Watch BrooonS/timezz on GitHub">Watch</a>

[Docs](https://brooons.github.io/timezz/) | [Licence](https://github.com/BrooonS/timezz/blob/master/LICENSE)

> With this plugin you can easily include the timer on your site, his works both ways.

## Example

<iframe src="https://codesandbox.io/embed/w638mz6q68?autoresize=1&fontsize=14&hidenavigation=1&view=preview" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

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
  date: 'Dec 02, 2013 00:00:00',
  isStopped: false,
  canContinue: false,
  template: '<span>NUMBER<i>LETTER</i></span> ',
  text: {
    days: 'd',
    hours: 'h',
    minutes: 'm',
    seconds: 's',
  },
  beforeCreate() {},
  beforeDestroy() {},
  finished() {},
});
```

### Params

#### date

The date to or from which need count.

- type: `string` or `Date`
- default: `null`

#### text

How to name days, hours, minutes and seconds.

- type: `object`
- default:

```JS
{
  days: 'd',
  hours: 'h',
  minutes: 'm',
  seconds: 's',
}
```

#### isStopped

The timer is stopped at start.

- type: `boolean`
- default: `false`

#### canContinue

When the timer finishes counting, whether to turn it off or continue counting.

- type: `boolean`
- default: `false`

#### template

Template to display tags, `NUMBER` and `LETTER` will be replace in number and letter in counting.

- type: `string`
- default: `<span>NUMBER<i>LETTER</i></span> `

#### beforeCreate

Callback which be completed before the timer will be created.

- type: `function`
- default:

```js
function() {}
```

#### beforeDestroy

Callback which be completed before timer will be destroyed.

- type: `function`
- default:

```js
function() {}
```

#### finished

Callback which be completed when the timer will be finished counting. Does not apply to `canContinue: true`.

- type: `function`
- default:

```js
function() {}
```

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
