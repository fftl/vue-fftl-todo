<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from '@/components/common/SearchInput.vue'
import { useRouter } from 'vue-router'

const q = ref('')
const router = useRouter()

function onSearch(query: string) {
  if (!query) return
  router.push({ name: 'search', query: { q: query } })
}
</script>

<template>
  <div style="max-width: 680px; margin: 0 auto">
    <SearchInput v-model="q" placeholder="검색어를 입력해주세요" @submit="onSearch" />
  </div>
  <ul>
    <!-- <li v-for=""></li> -->
  </ul>
</template>
