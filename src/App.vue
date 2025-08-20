<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h1>fftl-todo</h1>
  <RouterLink to="/home"> 시작하기 </RouterLink>

  <RouterView></RouterView>
</template>

<style scoped></style>
