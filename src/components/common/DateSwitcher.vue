<!-- src/components/common/DateSwitcher.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { getTodoesDay } from '@/services/todo'

type YMD = string // 'YYYY-MM-DD'

const props = withDefaults(
  defineProps<{
    modelValue: YMD
    showToday?: boolean
  }>(),
  {
    showToday: true,
  },
)

async function doGetTodoes() {
  console.log(getTodoesDay(props.modelValue))
}

const emit = defineEmits<{
  (e: 'update:model-value', v: YMD): void
  (e: 'change', v: YMD): void
}>()

function toYMD(d: Date): YMD {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function addDays(ymd: YMD, delta: number): YMD {
  const [y, m, d] = ymd.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + delta)
  return toYMD(dt)
}

const label = computed(() => {
  const [y, m, d] = props.modelValue.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  // 예: 2025. 9. 26. (금)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(dt)
})

function setDate(v: YMD) {
  emit('update:model-value', v)
  emit('change', v)
  doGetTodoes()
}
function prev() {
  setDate(addDays(props.modelValue, -1))
}
function next() {
  setDate(addDays(props.modelValue, +1))
}
function today() {
  setDate(toYMD(new Date()))
  doGetTodoes()
}
function onPick(e: Event) {
  const v = (e.target as HTMLInputElement).value as YMD
  if (v) setDate(v)
}
</script>

<template>
  <div class="ds-wrap" role="group" aria-label="날짜 선택">
    <button class="nav" type="button" @click="prev" aria-label="이전 날">←</button>

    <div class="center">
      <input class="picker" type="date" :value="modelValue" @input="onPick" />
      <span class="label">{{ label }}</span>
    </div>

    <button class="nav" type="button" @click="next" aria-label="다음 날">→</button>

    <button v-if="showToday" class="today" type="button" @click="today">오늘</button>
  </div>
</template>

<style scoped>
.ds-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.nav {
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}

.center {
  display: flex;
  align-items: center;
  gap: 10px;
}

.picker {
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
}

.label {
  font-weight: 600;
}

.today {
  padding: 6px 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
</style>
