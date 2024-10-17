<script setup lang="ts">
import type { UpdateEvent } from 'timezz'
import { Timezz } from 'timezz/vue'

function onUpdate(event: UpdateEvent) {
  console.log(event)
}
</script>

<template>
  <Timezz
    :date="new Date('2026-01-01')"
    :pause="false"
    :stop-on-zero="true"
    @update="onUpdate"
  >
    <div>
      Years:
      <div data-years />
    </div>
    <div>
      Days:
      <div data-days />
    </div>
    <div>
      Hours:
      <div data-hours />
    </div>
    <div>
      Minutes:
      <div data-minutes />
    </div>
    <div>
      Seconds:
      <div data-seconds />
    </div>
  </Timezz>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
