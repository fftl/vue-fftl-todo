<!-- src/views/Main.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RoutineBar from '@/components/routine/RoutineBar.vue'
import DateSwitcher from '@/components/common/DateSwitcher.vue'
import Routine from '@/components/Routine.vue'
import TodoList from '@/components/TodoList.vue'
import Todo from '@/components/Todo.vue'
import { getTodoesDay, addTodo, getTodos } from '@/services/todo'
import type { RoutineRequest } from '@/types/routine'
import { addRoutine } from '@/services/routine'
import { useTodos } from '@/composables/useTodos'

const {
  text,
  loading,
  todos,
  routines,
  onCreateRoutine,
  makeTodosByRoutine,
  doAddTodo,
  toggle,
  fmt,
} = useTodos()

type YMD = string
const selectedDate = ref(new Date().toISOString().slice(0, 10))

async function fetchTodos(date: YMD) {
  todos.value = (await getTodoesDay(date)) ?? []
}

async function loadRoutines() {}

// async function createRoutineFromCurrentList(name: string) {
//   routines.value.unshift({ id: Date.now(), name })
// }

async function applyRoutineToDate(id: number, date: string) {
  console.log('apply routine', id, 'to', date)
}

function onChangeDate(d: YMD) {
  selectedDate.value = d
  fetchTodos(d)
}

onMounted(() => fetchTodos(selectedDate.value))
</script>

<template>
  <div class="page">
    <header class="page__header"></header>

    <!-- Routines -->
    <section class="card">
      <div class="card__header">
        <h2 class="card__title">Routines</h2>
      </div>
      <div class="card__body">
        <Routine :routines="routines" />
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
        <TodoList :todos="todos" />
      </div>
    </section>

    <!-- Todo input + list -->
    <section class="card">
      <div class="card__header center">
        <h2 class="card__title">Insert your today Todo.</h2>
        <p class="card__subtitle sub_button" @click="onCreateRoutine">
          자주 쓰는 작업을 묶어 한 번에 추가하세요
        </p>
        <!-- </button> -->
      </div>
      <div class="card__body stack">
        <Todo
          :text="text"
          :loading="loading"
          :todos="todos"
          :fmt="fmt"
          @add-todo="doAddTodo"
          @toggle="toggle"
        />
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

.sub_button:hover {
  cursor: pointer;
}

/* 헤더를 기준점으로 */
.card__header {
  position: relative; /* ✅ 기준 요소 */
  padding-right: 56px; /* 우측 아이콘/버튼과 겹치지 않도록 여유 */
}

/* 우측 상단 고정 */
.sub_button {
  position: absolute; /* ✅ 절대 배치 */
  top: 12px; /* 필요에 맞게 미세조정 */
  right: 16px;
  font-size: 13px;
  color: var(--primary, #3b82f6);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  text-decoration: underline; /* 링크 느낌 유지 원하면 */
}

/* 헤더의 가운데 정렬은 타이틀에만 적용 (전체 center 대신) */
.card__title {
  text-align: center; /* ✅ 타이틀만 중앙 */
  width: 100%;
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
