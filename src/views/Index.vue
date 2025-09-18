<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { signUp, idCheck } from '@/services/member'

const username = ref('')
const password = ref('')

function runIdCheck() {
  const test = idCheck(username.value)
  console.log(test)
}
</script>

<template>
  <h1 class="title">fftl-todo</h1>
  <div class="input">
    <h2>로그인해봐</h2>
    <span>아이디 : </span><input type="text" v-model="username" />
    <div></div>
    <span>비밀번호 : </span><input type="password" v-model="password" />
    <button @click="runIdCheck">로그인</button>
    <RouterLink class="start" to="/signup">회원가입</RouterLink>
  </div>
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
.input {
  text-align: center;
}
</style>
