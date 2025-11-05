<script setup lang="ts">
import { computed } from 'vue'
import type { Routine } from '@/types/routine'

const props = defineProps<{ routines: Routine[] }>()
const empty = computed(() => props.routines.length === 0)

const emit = defineEmits<{
  (e: 'make-todo', routineId: number): void
}>()

function makeTodos(routineId: number) {
  emit('make-todo', routineId)
  console.log('test')
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
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.chip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px 12px;
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}
.chip {
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  cursor: pointer;
  font-weight: 600;
  transition:
    transform 0.08s ease,
    box-shadow 0.12s ease,
    background 0.12s ease;
}
.chip:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}
.chip:active {
  transform: translateY(0);
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
}
</style>
