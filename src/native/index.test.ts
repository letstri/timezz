import { afterEach, describe, expect, it } from 'vitest'
import { timezz } from './index'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('throw tests', () => {
  const defaultBody = `<div>
    <div class="j-timer"></div>
  </div>`

  it('init empty instance and get an error', () => {
    // @ts-expect-error test
    expect(() => timezz()).toThrow()
  })

  it('init with incorrect selector and get an error', () => {
    // @ts-expect-error test
    expect(() => timezz(document.querySelector('.not-exist'), { date: new Date() })).toThrow()
  })

  it('init without options and get an error', () => {
    document.body.innerHTML = defaultBody

    // @ts-expect-error test
    expect(() => timezz(document.querySelector('.j-timer'))).toThrow()
  })
})

describe('init and destroy tests', () => {
  it('init instance', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`

    const timerElement = document.querySelector('.j-timer')

    timezz(timerElement!, { date: new Date() })

    expect(timerElement!.querySelector('[data-seconds]')!.innerHTML).not.toBe('')
  })

  it('init and destroy', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`

    const timer = timezz(document.querySelector('.j-timer')!, { date: new Date() })

    timer.destroy()

    expect(timer.isDestroyed).toBe(true)
  })

  it('init, destroy and reinit', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`

    const timer = timezz(document.querySelector('.j-timer')!, { date: new Date() })

    timer.destroy()

    expect(timer.isDestroyed).toBe(true)

    timer.init()

    expect(timer.isDestroyed).toBe(false)

    expect(document.querySelector('.j-timer')!.querySelector('[data-seconds]')!.innerHTML).not.toBe(
      '',
    )
  })
})

describe('options test', () => {
  it('init with zero', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-seconds></span>
      </div>
    </div>`

    const timerElement = document.querySelector('.j-timer')

    timezz(timerElement!, { date: 'Feb 24, 2022 04:30:00', stopOnZero: true })

    expect(timerElement!.querySelector('[data-seconds]')!.innerHTML).toBe('00')
  })

  it('show years', () => {
    document.body.innerHTML = `<div>
      <div class="j-timer">
        <span data-years></span>
      </div>
    </div>`

    const timerElement = document.querySelector('.j-timer')

    timezz(timerElement!, { date: new Date(Date.now() + (86400 * 1000 * 365)), withYears: true, pause: true })

    expect(timerElement!.querySelector('[data-years]')!.innerHTML).toBe('01')
  })
})
