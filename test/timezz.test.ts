import timezz from '../dist/timezz';

test('init empty instance and get error', () => {
  expect(() => timezz()).toThrow();
});

test('init instance only with selector and get error', () => {
  expect(() => timezz('.nothing')).toThrow();
});
