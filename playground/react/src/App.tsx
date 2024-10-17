import { Timezz } from 'timezz/react'
import './App.css'

function App() {
  return (
    <>
      <Timezz date={new Date('2026-01-01')}>
        <div data-seconds>Hello</div>
        <div data-minutes>Hello</div>
        <div data-hours>Hello</div>
        <div data-days>Hello</div>
      </Timezz>
    </>
  )
}

export default App
