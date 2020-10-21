import timezz from '../dist/timezz';

test('init and get error', () => {
  expect(() => timezz()).toThrow();
});

test('init only with selector and get error', () => {
  expect(() => timezz('.nothing')).toThrow();
});
