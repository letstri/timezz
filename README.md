<p align="center"><img src="https://brooons.github.io/timezz/img/timezz-github-logo.png" alt="TimezZ"></p>

# TimezZ

With this plugin you can easily put a timer on your site, it works both ways. You can use two version, one version is the version for modern browsers with the standards of the ES2017 and the version for old browsers with ES2015 standards. Using the config you can change the tags as letters and numbers, you can also change the text output next to the numbers.

## Usage

> If you need support for older browsers such as IE9, use `jquery.timezz-es2015.js`

**Connect**
```html
<script src="/js/jquery.timezz.min.js"></script>
```

**HTML**
```html
<div id="timer"></div>
```

**Initialization**
```js
$('#timer').timezz();
```

**Example Styling**
```css
#timer {
  font-size: 70px;
}
#timer span {
  color: #555;
}
#timer i {
  color: #bbb;
  font-size: 40px;
}
```

## Config

```js
$('#timer').timezz({
  'date' : 'January 1, 2040 00:00:00',
  'days' : 'd',
  'hours' : 'h',
  'minutes' : 'm',
  'seconds' : 's',
  'tagNumber' : 'span',
  'tagLetter' : 'i'
 });
```

| Setting       |  Default                    | Description                          | Example        |
| ------------- | --------------------------- | ------------------------------------ | -------------- |
| **date**      | `January 1, 2040 00:00:00`  | Indicate the date                    | `Apr 15, 2018` |
| **days**      | `d`                         | How to name days                     | ` days`        |
| **hours**     | `h`                         | How to name hours                    | ` hours`       |
| **minutes**   | `m`                         | How to name minutes                  | ` min`         |
| **seconds**   | `s`                         | How to name seconds                  | ` sec`         |
| **tagNumber** | `span`                      | Tag in which will be wrapped numbers | `div` or `b`   |
| **tagLetter** | `i`                         | Tag in which will be wrapped letters | `span` or `p`  |


## Author

**@BrooonS**

## Licence
MIT [licence](https://github.com/BrooonS/TimezZ/blob/master/LICENSE)
