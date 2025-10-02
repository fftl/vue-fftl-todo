<!-- src/views/Main.vue -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RoutineBar from '@/components/routine/RoutineBar.vue' // 루틴 칩 목록 + +New 버튼
import DateSwitcher from '@/components/common/DateSwitcher.vue' // ←/→ + 📅
import Routine from '@/components/Routine.vue' // 기존 섹션(원하면 유지)
import Todo from '@/components/Todo.vue' // 입력 + 추가
import TodoList from '@/components/TodoList.vue' // 목록 표시

// 날짜 상태 (YYYY-MM-DD)
const selectedDate = ref(new Date().toISOString().slice(0, 10))

// 루틴 목록 (간단 요약 타입)
type RoutineSummary = { id: number; name: string }
const routines = ref<RoutineSummary[]>([])

// --- 서비스 호출부 (실제 API 로직으로 교체하세요) ---
async function loadRoutines() {
  // 예: const { data } = await api.get('/routines')
  // routines.value = data
  routines.value = [
    { id: 1, name: '아침 루틴' },
    { id: 2, name: '운동 루틴' },
  ]
}

async function createRoutineFromCurrentList(name: string) {
  // 예: await api.post('/routines', { name, items: currentTodosSnapshot })
  // const created = await ...
  // routines.value.unshift(created)
  routines.value.unshift({ id: Date.now(), name })
}

async function applyRoutineToDate(id: number, date: string) {
  // 예: await api.post(`/routines/${id}/apply?date=${date}`)
  // 적용 후 TodoList가 해당 날짜 목록을 새로 고치도록 이벤트/상태를 갱신
  // 여기서는 간단히 콘솔만
  console.log('apply routine', id, 'to', date)
}

// DateSwitcher 변경 시 호출
function onChangeDate(d: string) {
  selectedDate.value = d
  // TodoList가 날짜를 기반으로 로드하도록 prop/emit/Pinia 등으로 신호 주면 됨
  // 예) 이벤트 버스나 Pinia store의 selectedDate 갱신
}

function onCreateRoutine() {
  const name = window.prompt('루틴 이름을 입력하세요')
  if (!name?.trim()) return
  createRoutineFromCurrentList(name.trim())
}

function onApplyRoutine(id: number) {
  applyRoutineToDate(id, selectedDate.value)
}

onMounted(() => {
  loadRoutines()
})
</script>

<template>
  <div class="container">
    <!-- 상단 타이틀(선택) -->
    <h1 class="page-title">Routine</h1>

    <!-- 루틴 바: 칩 + +New -->
    <section class="section">
      <div class="section-header">
        <h2>Routines</h2>
        <button class="btn-new" @click="onCreateRoutine">+ New</button>
      </div>
      <RoutineBar :routines="routines" @apply="onApplyRoutine" />
    </section>

    <!-- 날짜 스위처 -->
    <section class="section">
      <DateSwitcher :model-value="selectedDate" @update:model-value="onChangeDate" />
    </section>

    <!-- 기존 루틴 섹션(원하면 유지) -->
    <Routine />

    <div class="space" />

    <!-- 입력 + 리스트 -->
    <section class="section">
      <h2 class="title">Insert your today Todo.</h2>
      <Todo />
      <TodoList />
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
}

.page-title {
  text-align: center;
  margin: 8px 0 16px;
}

.section {
  margin-bottom: 18px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.btn-new {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #111827;
  color: #fff;
  cursor: pointer;
}

.space {
  height: 12px;
}

.title {
  text-align: center;
  margin: 12px 0;
}
</style>
