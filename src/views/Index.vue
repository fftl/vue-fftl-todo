<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1 class="title">fftl-todo</h1>
  <RouterLink class="start" to="/main">시작하기</RouterLink>
</template>

<style scoped>
.title {
  text-align: center;
}
.start {
  display: block;
  width: fit-content;
  margin: 16px auto 0;
  text-decoration: none;
  padding: 8px 20px;
}
</style>
