<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchInput from '@/components/common/SearchInput.vue'
import { getTodos, addTodo, checkTodo } from '@/services/todo'
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
}>()

function onSubmit() {
  emit('add-todo', input.value)
  //TODO
  // input 비우기 필요
}

function onToggle(todo: Todo) {
  emit('toggle', todo)
}
</script>

<template>
  <div style="max-width: 680px; margin: 0 auto">
    <!-- SearchInput은 입력/제출만 담당, API 호출은 부모(doAddTodo) -->
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
        <time class="date">{{ fmt(t.date) }}</time>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  margin: 16px 0 12px;
}
.list {
  margin-top: 16px;
  padding: 0;
  list-style: none;
}
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}
.text {
  font-size: 15px;
}
.done {
  text-decoration: line-through;
  color: #9ca3af;
}
.date {
  font-size: 12px;
  color: #6b7280;
}
</style>
