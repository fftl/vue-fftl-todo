<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from '@/components/common/SearchInput.vue'
import type { Todo } from '@/types/todo'

const input = ref('')

const props = defineProps<{
  loading: boolean
  todos: Todo[]
  fmt: (d: string) => string
}>()

const emit = defineEmits<{
  (e: 'add-todo', text?: string): void
  (e: 'toggle', todo: Todo): void
  (e: 'remove', todo: Todo): void // 🔥 삭제 이벤트 추가
}>()

function onSubmit() {
  if (!input.value.trim()) return
  emit('add-todo', input.value.trim())
  input.value = '' // 🔥 입력 비우기
}

function onToggle(todo: Todo) {
  emit('toggle', todo)
}

function onRemove(todo: Todo) {
  // 여기서 confirm을 잠깐 쓸 수도 있고,
  // 그냥 바로 emit 하고 부모에서 처리해도 됨
  emit('remove', todo)
}
</script>

<template>
  <div style="max-width: 680px; margin: 0 auto">
    <SearchInput
      v-model="input"
      placeholder="할일을 입력해주세요."
      :disabled="loading"
      @submit="onSubmit()"
    />

    <ul class="list">
      <li v-for="t in todos" :key="t.todoId" class="item">
        <label class="row">
          <input type="checkbox" :checked="t.checked" @change="onToggle(t)" />
          <span class="text" :class="{ done: t.checked }">{{ t.text }}</span>
        </label>

        <div class="right">
          <time class="date">{{ fmt(t.date) }}</time>
          <button type="button" class="icon-btn" @click="onRemove(t)">×</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  margin-top: 16px;
  padding: 0;
  list-style: none;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 10px;
  background: #fff;
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.text {
  font-size: 15px;
}
.done {
  text-decoration: line-through;
  color: #9ca3af;
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.date {
  font-size: 12px;
  color: #6b7280;
}

/* X 버튼 */
.icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 4px 6px;
  border-radius: 999px;
}
.icon-btn:hover {
  background: #f3f4f6;
}
.icon-btn:active {
  background: #e5e7eb;
}
</style>
