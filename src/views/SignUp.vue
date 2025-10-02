<script setup lang="ts">
import { ref } from 'vue'
import type { LoginRequest } from '@/types/auth'
import { idCheck, signUp } from '@/services/member'

const username = ref('')
const password = ref('')
const passwordCheck = ref('')

function doIdCheck() {
  idCheck(username.value)
}

function doSignUp() {
  const loginRequest: LoginRequest = {
    username: username.value,
    password: password.value,
  }

  console.log(signUp(loginRequest))
}
</script>

<template>
  <h2>회원가입</h2>
  <span>아이디 : </span><input type="text" v-model="username" /><button @click="doIdCheck">
    아이디 중복확인
  </button>
  <div></div>
  <span>비밀번호 : </span><input type="password" v-model="password" />
  <div></div>
  <span>비밀번호 확인: </span><input type="password" v-model="passwordCheck" />
  <button @click="doSignUp">회원 가입</button>
</template>
