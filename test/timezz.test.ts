import timezz from '../dist/timezz';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('throw tests', () => {
  const defaultBody = `<div>
    <div class="j-timer"></div>
  </div>`;

  test('init empty instance and get an error', () => {
    expect(() => timezz()).toThrow();
  });

  test('init with incorrect selector and get an error', () => {
    expect(() => timezz(document.querySelector('.not-exist'), { date: new Date() })).toThrow();
  });

  test('init without options and get an error', () => {
    document.body.innerHTML = defaultBody;

    expect(() => timezz(document.querySelector('.j-timer'))).toThrow();
  });
});

describe('init and destroy tests', () => {
  test('init instance', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`;

    const timerElement = document.querySelector('.j-timer');

    timezz(timerElement, { date: new Date() });

    expect(timerElement.querySelector('[data-seconds]').innerHTML).not.toBe('');
  });

  test('init and destroy', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`;

    const timer = timezz(document.querySelector('.j-timer'), { date: new Date() });

    timer.destroy();

    expect(timer.isDestroyed).toBe(true);
  });

  test('init, destroy and reinit', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`;

    const timer = timezz(document.querySelector('.j-timer'), { date: new Date() });

    timer.destroy();

    expect(timer.isDestroyed).toBe(true);

    timer.init();

    expect(timer.isDestroyed).toBe(false);

    expect(document.querySelector('.j-timer').querySelector('[data-seconds]').innerHTML).not.toBe('');
  });
});

describe('options test', () => {
  test('init with zero', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`;

    const timerElement = document.querySelector('.j-timer');

    timezz(timerElement, { date: 'Feb 24, 2022 04:30:00', stopOnZero: true });

    expect(timerElement.querySelector('[data-seconds]').innerHTML).toBe('00');
  });
});
