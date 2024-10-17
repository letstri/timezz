import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { timezz, type Timezz as TimezzType } from '../native'

export const Timezz = defineComponent({
  name: 'Timezz',
  props: {
    date: {
      type: [Date, String, Number],
      required: true,
    },
    pause: {
      type: Boolean,
      default: false,
    },
    stopOnZero: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update'],
  setup(props, { slots, emit }) {
    const element = ref<HTMLDivElement | null>(null)
    const timezzInstance = ref<TimezzType | null>(null)

    onMounted(() => {
      if (element.value) {
        timezzInstance.value = timezz(element.value, {
          date: props.date,
          pause: props.pause,
          stopOnZero: props.stopOnZero,
          update: (event) => {
            emit('update', event)
          },
        })
      }
    })

    watch(() => [props.date, props.pause, props.stopOnZero], () => {
      if (timezzInstance.value) {
        timezzInstance.value.pause = props.pause
        timezzInstance.value.stopOnZero = props.stopOnZero
        timezzInstance.value.date = props.date
      }
    })

    onUnmounted(() => {
      timezzInstance.value?.destroy()
    })

    return () => h('div', { ref: element }, slots.default?.())
  },
})
