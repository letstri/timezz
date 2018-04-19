<p align="center"><img src="https://brooons.github.io/timezz/img/timezz-github-logo.png" alt="TimezZ"></p>

# TimezZ

With this plugin you can easily put a timer on your site, it works both ways. Using the config you can change the tags as letters and numbers, you can also change the text output next to the numbers.

Watch [our site](https://brooons.github.io/timezz/) for more information and russian guide.

## Usage

**Connect**
```html
<script src="/js/timezz.min.js"></script>
```

**HTML**
```html
<div class="timer j-timer"></div>
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
  tagNumber: 'span',
  tagLetter: 'i',
  stop: false,
});
```

| Setting     |  Default                    | Description                          | Type      |
| ----------- | --------------------------- | ------------------------------------ | --------- |
| date        | `January 1, 2040 00:00:00`  | Indicate the date                    | `string`  |
| daysName    | `d`                         | How to name days                     | `string`  |
| hoursName   | `h`                         | How to name hours                    | `string`  |
| minutesName | `m`                         | How to name minutes                  | `string`  |
| secondsName | `s`                         | How to name seconds                  | `string`  |
| tagNumber   | `span`                      | Tag in which will be wrapped numbers | `string`  |
| tagLetter   | `i`                         | Tag in which will be wrapped letters | `string`  |
| isStop      | `false`                     | Is this timer a working?             | `boolean` |


## Author

**@BrooonS**

## Licence
MIT [licence](https://github.com/BrooonS/TimezZ/blob/master/LICENSE)
