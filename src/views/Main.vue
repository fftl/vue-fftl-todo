<script setup lang="ts">
import Routine from '../components/Routine.vue'
import Todo from '../components/Todo.vue'
</script>

<template>
  <div class="container">
    <h1 class="title">Routine</h1>
    <Routine></Routine>
    <div class="space"></div>
    <h1 class="title">Insert your today Todo.</h1>
    <Todo></Todo>
    <TodoList></TodoList>
  </div>
</template>

<style scoped>
.space {
  height: 80px;
}

.container {
  /* 부모 가로 중앙 */
  max-width: 800px; /* 혹은 width: 1000px */
  margin: 0 auto; /* 좌우 auto ⇒ 중앙 정렬 */
  padding: 24px 16px; /* 여백은 선택 */
}

.title {
  text-align: center;
}
</style>
