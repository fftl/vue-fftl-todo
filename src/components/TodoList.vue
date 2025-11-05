<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '@/types/todo'

const props = defineProps<{ histories: Todo[] }>()

// 날짜 내림차순으로 정렬해 그룹핑
const groups = computed(() => {
  const byDate = new Map<string, Todo[]>()
  const sorted = [...props.histories].sort((a, b) => (a.date < b.date ? 1 : -1))
  for (const t of sorted) {
    if (!byDate.has(t.date)) byDate.set(t.date, [])
    byDate.get(t.date)!.push(t)
  }
  return Array.from(byDate.entries()) // [ [date, Todo[]], ... ]
})

const empty = computed(() => props.histories.length === 0)

function fmtKOR(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}
</script>

<template>
  <div class="history">
    <!-- 비었을 때 -->
    <div v-if="empty" class="empty">
      <div class="empty__icon">🗂️</div>
      <p class="empty__title">기록이 아직 없어요</p>
      <p class="empty__sub">완료한 할 일을 모아두면 여기에서 한눈에 볼 수 있어요.</p>
    </div>

    <!-- 날짜 그룹 -->
    <div v-else class="section" v-for="[date, items] in groups" :key="date">
      <div class="section__header">
        <h3 class="section__title">{{ fmtKOR(date) }}</h3>
        <span class="badge">{{ items.length }}</span>
      </div>

      <ul class="list">
        <li v-for="t in items" :key="t.todoId" class="item">
          <div class="item__left">
            <span class="dot" :class="{ done: t.checked }" />
            <span class="text" :class="{ doneText: t.checked }">{{ t.text }}</span>
          </div>
          <span class="pill" :class="t.checked ? 'pill--done' : 'pill--open'">
            {{ t.checked ? '완료' : '기록' }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.history {
  display: grid;
  gap: 14px;
}

/* 빈 상태 */
.empty {
  text-align: center;
  padding: 28px 12px;
  color: var(--muted, #5b667b);
}
.empty__icon {
  font-size: 28px;
}
.empty__title {
  margin: 8px 0 2px;
  font-weight: 800;
  color: var(--text, #0d1117);
}
.empty__sub {
  margin: 0;
  font-size: 13px;
}

/* 섹션 헤더 */
.section {
  background: transparent;
}
.section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 6px 2px 4px;
}
.section__title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
}
.badge {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: #eef2ff;
  color: #3730a3;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid #e0e7ff;
}

/* 리스트/아이템 */
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--border, rgba(13, 17, 23, 0.08));
  border-radius: 12px;
  background: var(--card, #fff);
  box-shadow: 0 6px 14px rgba(17, 24, 39, 0.06);
}
.item__left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e5e7eb;
  border: 1px solid #d1d5db;
}
.dot.done {
  background: #10b981;
  border-color: #059669;
}
.text {
  font-size: 14px;
  color: var(--text, #0d1117);
}
.doneText {
  color: #6b7280;
  text-decoration: line-through;
}

/* 상태 Pill */
.pill {
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  border: 1px solid transparent;
  user-select: none;
}
.pill--done {
  background: #ecfdf5;
  color: #065f46;
  border-color: #a7f3d0;
}
.pill--open {
  background: #f8fafc;
  color: #334155;
  border-color: #e2e8f0;
}
</style>
