<script setup lang="ts">
import { ref } from 'vue'

const empty = ref(true)
</script>

<template>
  <h2 v-if="empty">리스트!!</h2>
  <h2 v-else>등록된 루틴이 없습니다.</h2>
</template>
