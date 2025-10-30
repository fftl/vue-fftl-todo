<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '@/types/todo'

const props = defineProps<{ todos: Todo[] }>()
const empty = computed(() => props.todos.length === 0)
</script>

<template>
  <div>
    <h2 v-if="empty">등록된 투두가 없습니다.</h2>
    <ul v-else>
      <li v-for="t in props.todos" :key="t.todoId">
        {{ t.date }} ({{ t.text }}) <span v-if="t.checked == true">👌</span>
      </li>
    </ul>
  </div>
</template>
