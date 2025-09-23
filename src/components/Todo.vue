<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from '@/components/common/SearchInput.vue'
import { useRouter } from 'vue-router'
import { addTodo } from '@/services/todo'

const text = ref('')
const router = useRouter()

function doAddTodo() {
  console.log(text.value)
  addTodo(text.value)
}
</script>

<template>
  <div style="max-width: 680px; margin: 0 auto">
    <SearchInput v-model="text" placeholder="할일을 입력해주세요." @submit="doAddTodo" />
  </div>
  <ul>
    <!-- <li v-for=""></li> -->
  </ul>
</template>
