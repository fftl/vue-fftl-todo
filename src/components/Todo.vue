<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchInput from '@/components/common/SearchInput.vue'
import { getTodos, addTodo, checkTodo } from '@/services/todo'
import type { Todo } from '@/types/todo'

const text = ref('')
const todos = ref<Todo[]>([])
const loading = ref(false)

onMounted(async () => {
  try {
    todos.value = await getTodos()
  } catch (e) {
    console.error(e)
  }
})

async function doAddTodo(q?: string) {
  const t = (q ?? text.value).trim()
  if (!t || loading.value) return
  loading.value = true
  try {
    // ① 서버에 저장
    const created = await addTodo(t) // Todo 한 건이 돌아온다고 가정
    // ② 화면에 즉시 추가
    todos.value.unshift(created)
    // ③ 입력창 비우기
    text.value = ''
  } catch (e) {
    console.error(e)
    alert('등록에 실패했어요.')
  } finally {
    loading.value = false
  }
}

function toggle(todo: Todo) {
  // 체크 토글 UI만 즉시 반영 (서버 반영 API 있으면 호출)
  checkTodo(todo.todoId)
  todo.checked = !todo.checked
}

function fmt(d: string) {
  // "2025-09-26" → 보기 좋게
  return new Date(d).toLocaleDateString()
}
</script>

<template>
  <div style="max-width: 680px; margin: 0 auto">
    <!-- SearchInput은 입력/제출만 담당, API 호출은 부모(doAddTodo) -->
    <SearchInput
      v-model="text"
      placeholder="할일을 입력해주세요."
      :disabled="loading"
      @submit="doAddTodo"
    />

    <ul class="list">
      <li v-for="t in todos" :key="t.todoId" class="item">
        <label class="row">
          <input type="checkbox" :checked="t.checked" @change="toggle(t)" />
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
