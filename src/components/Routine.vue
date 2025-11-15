<script setup lang="ts">
import { computed } from 'vue'
import type { Routine } from '@/types/routine'

const props = defineProps<{ routines: Routine[] }>()
const empty = computed(() => props.routines.length === 0)

const emit = defineEmits<{
  (e: 'make-todo', routineId: number): void
  (e: 'remove', routineId: number): void // 🔥 삭제 이벤트 추가
}>()

function makeTodos(routineId: number) {
  emit('make-todo', routineId)
}

function onRemove(routineId: number) {
  emit('remove', routineId)
}
</script>

<template>
  <div>
    <h2 v-if="empty">등록된 루틴이 없습니다.</h2>

    <ul v-else class="chip-grid">
      <li v-for="r in props.routines" :key="r.routineId">
        <button class="chip" type="button" @click="makeTodos(r.routineId)">
          <span class="chip__id">{{ r.routineId }}</span>
          <span class="chip__name">{{ r.routineName }}</span>

          <!-- 🔥 오른쪽 X 버튼 -->
          <span class="chip__remove" @click.stop="onRemove(r.routineId)">×</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* 리스트 스타일(점) 완전히 제거 */
.chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  padding: 0;
  margin: 8px 0 0;
  list-style: none; /* 🔥 점 제거 */
}

/* 칩: 이전 높이로 얇게 복구 */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px; /* 🔥 얇고 컴팩트하게 */
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  font-size: 14px; /* 🔥 이전보다 살짝 작은 글자 */
  cursor: pointer;
  transition:
    background 0.12s ease,
    transform 0.08s ease;
}

.chip:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}

.chip__id {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  background: #111827;
  color: #fff;
  padding: 0 6px;
}

.chip__name {
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px; /* 너무 길어지지 않도록 제한 */
}

/* X 버튼 */
.chip__remove {
  font-size: 16px;
  padding: 2px 4px;
  border-radius: 50%;
  line-height: 1;
}

.chip__remove:hover {
  background: #e5e7eb;
}
</style>
