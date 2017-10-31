# TimezZ
Fast jQuery timer plugin for countdown and count forward

**Description**

With the help of this plugin you can easily put a timer on your site, it works both ways.

## Usage

If you need support for older browsers such as IE9, use `jquery.timezz-es2015.js`

**Connect**

    <script src="/js/jquery.timezz.min.js"></script>

**HTML**

    <div id="timer"></div>
    
**Initialization**

    $('#timer').timezz();

**Example Styling**

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

## Config

    $('#timer').timezz({
      'date' : 'January 1, 2040 00:00:00',
      'days' : 'd',
      'hours' : 'h',
      'minutes' : 'm',
      'seconds' : 's',
      'tagNumber' : 'span',
      'tagLetter' : 'i'
     });

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
