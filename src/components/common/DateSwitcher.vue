<!-- src/components/common/DateSwitcher.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { getTodoesDay } from '@/services/todo'

type YMD = string

const props = defineProps<{ modelValue: YMD; showToday?: boolean }>()
const emit = defineEmits<{ (e: 'update:model-value', v: YMD): void }>()

const today = new Date()
const yesYMD = computed(() =>
  toYMD(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
)

function setDate(v: YMD) {
  emit('update:model-value', v) // ✅ 부모가 이 이벤트를 받아서 fetchTodos 수행
}

async function doGetTodoes() {
  console.log(getTodoesDay(props.modelValue))
}

function toYMD(d: Date): YMD {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function check(ymd: string, delta: number): boolean {
  const [y, m, d] = ymd.split('-').map(Number)
  const dt = new Date(y, m - 1, d) // 기준 날짜
  const today = new Date() // 오늘 날짜

  // 날짜를 하루 단위로만 비교하기 위해 시/분/초를 0으로 맞춤
  today.setHours(0, 0, 0, 0)
  dt.setHours(0, 0, 0, 0)

  // delta 적용 후 날짜가 오늘을 넘는지 체크
  const newDt = new Date(dt.getTime() + delta)
  newDt.setDate(dt.getDate() + delta)

  if (newDt.getTime() < today.getTime()) {
    // 오늘보다 이전이거나 같은 경우만 적용
    return true
  }

  return false
}

function addDays(ymd: string, delta: number): string {
  const [y, m, d] = ymd.split('-').map(Number)

  const dt = new Date(y, m - 1, d) // 기준 날짜

  if (check(ymd, delta)) {
    // 오늘보다 이전이거나 같은 경우만 적용
    dt.setDate(dt.getDate() + delta)
  }
  return toYMD(dt)
}

const label = computed(() => {
  const [y, m, d] = props.modelValue.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).format(dt)
})

function prev() {
  setDate(addDays(props.modelValue, -1))
  doGetTodoes()
}

function next() {
  setDate(addDays(props.modelValue, +1))
  doGetTodoes()
}

function yesterday() {
  const [y, m, d] = props.modelValue.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  doGetTodoes()
}

function onPick(e: Event) {
  const v = (e.target as HTMLInputElement).value as YMD
  if (check(v, 0)) {
    setDate(v)
  } else {
    alert('test')
  }
}
</script>

<template>
  <div class="ds-wrap" role="group" aria-label="날짜 선택">
    <button class="nav" type="button" @click="prev" aria-label="이전 날">←</button>

    <div class="center">
      <input class="picker" type="date" :value="modelValue" @input="onPick" :max="yesYMD" />
      <span class="label">{{ label }}</span>
    </div>

    <button class="nav" type="button" @click="next" aria-label="다음 날">→</button>

    <button v-if="showToday" class="today" type="button" @click="yesterday">어제</button>
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
