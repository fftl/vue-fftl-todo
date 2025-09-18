<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
</script>

<template>
  <input type="text" v-bind:value="username" />
  <input type="password" v-bind:value="password" />
</template>
