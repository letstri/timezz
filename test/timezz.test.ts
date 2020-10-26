import timezz from '../dist/timezz';

test('init and get error', () => {
  expect(() => timezz()).toThrow();
});

test('init only with selector and get error', () => {
  expect(() => timezz('.nothing')).toThrow();
});

test('init and destroy', () => {
  const timer = timezz([], { date: new Date });

  expect(timer.elements).toEqual([]);

  timer.destroy();
});
