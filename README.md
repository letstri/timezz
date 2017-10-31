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
     
===**`date`** indicate the date, default: `January 1, 2040 00:00:00`

Example: `Apr 15, 2018`

===**`days`** how to name days, default: `d`

Example: `days`

===**`hours`** how to name hours, default: `h`

Example: `hours`

===**`minutes`** how to name minutes, default: `m`

Example: `min`

===**`seconds`** how to name seconds, default: `s`

Example: `sec`

===**`tagNumber`** tag in which will be wrapped numbers, default: `span`

Example: `div` or `b`

===**`tagLetter`** tag in which will be wrapped letters, default: `i`

Example: `span` or `p`

## Author

**@BrooonS**

## Licence
MIT [licence](https://github.com/BrooonS/TimezZ/blob/master/LICENSE)
