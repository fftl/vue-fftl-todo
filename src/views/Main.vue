<!-- src/views/Main.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RoutineBar from '@/components/routine/RoutineBar.vue'
import DateSwitcher from '@/components/common/DateSwitcher.vue'
import Routine from '@/components/Routine.vue'
import Todo from '@/components/Todo.vue'
import TodoList from '@/components/TodoList.vue'

const selectedDate = ref(new Date().toISOString().slice(0, 10))
type RoutineSummary = { id: number; name: string }
const routines = ref<RoutineSummary[]>([])

async function loadRoutines() {
  routines.value = [
    { id: 1, name: '아침 루틴' },
    { id: 2, name: '운동 루틴' },
  ]
}
async function createRoutineFromCurrentList(name: string) {
  routines.value.unshift({ id: Date.now(), name })
}
async function applyRoutineToDate(id: number, date: string) {
  console.log('apply routine', id, 'to', date)
}
function onChangeDate(d: string) {
  selectedDate.value = d
}
function onCreateRoutine() {
  const name = window.prompt('루틴 이름을 입력하세요')
  if (!name?.trim()) return
  createRoutineFromCurrentList(name.trim())
}
function onApplyRoutine(id: number) {
  applyRoutineToDate(id, selectedDate.value)
}

onMounted(loadRoutines)
</script>

<template>
  <div class="page">
    <header class="page__header">
      <h1 class="page__title">Routine</h1>
      <button class="btn btn--primary" @click="onCreateRoutine">+ New</button>
    </header>

    <!-- Routines -->
    <section class="card">
      <div class="card__header">
        <h2 class="card__title">Routines</h2>
        <p class="card__subtitle">자주 쓰는 작업을 묶어 한 번에 추가하세요</p>
      </div>
      <div class="card__body">
        <RoutineBar :routines="routines" @apply="onApplyRoutine" />
      </div>
    </section>

    <!-- Date & Controls -->
    <section class="card">
      <div class="card__body center">
        <DateSwitcher :model-value="selectedDate" @update:model-value="onChangeDate" />
      </div>
    </section>

    <!-- (선택) 기존 섹션 유지 -->
    <section class="card card--soft">
      <div class="card__body">
        <Routine />
      </div>
    </section>

    <!-- Todo input + list -->
    <section class="card">
      <div class="card__header center">
        <h2 class="card__title">Insert your today Todo.</h2>
      </div>
      <div class="card__body stack">
        <Todo />
        <TodoList />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 페이지 레이아웃 */
.page {
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 16px 56px;
  color: var(--text, #0d1117);
}
.page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}
.page__title {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0.2px;
}

/* 카드 공통 */
.card {
  background: var(--card, #fff);
  border: 1px solid var(--border, rgba(13, 17, 23, 0.08));
  border-radius: 16px;
  box-shadow: var(--shadow, 0 10px 24px rgba(17, 24, 39, 0.08));
  overflow: hidden;
  margin-bottom: 16px;
  animation: fade-in 0.25s ease both;
}
.card--soft {
  background: color-mix(in oklab, var(--card, #fff) 92%, transparent);
}
.card__header {
  padding: 18px 20px 6px;
}
.card__body {
  padding: 16px 20px 20px;
}
.card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
}
.card__subtitle {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--muted, #5b667b);
}
.center {
  text-align: center;
}
.stack {
  display: grid;
  gap: 14px;
}

/* 버튼 */
.btn {
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--border, rgba(13, 17, 23, 0.08));
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.12s ease,
    filter 0.12s ease,
    box-shadow 0.12s ease;
}
.btn--primary {
  background: linear-gradient(180deg, var(--primary, #3b82f6), var(--primary-press, #326fd1));
  color: #fff;
  border-color: transparent;
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.25);
}
.btn--primary:hover {
  transform: translateY(-1px);
}
.btn--primary:active {
  transform: translateY(0);
  filter: brightness(0.97);
}

/* 미세 애니메이션 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 반응형 */
@media (max-width: 640px) {
  .page__title {
    font-size: 26px;
  }
  .card__body {
    padding: 14px;
  }
}
</style>
