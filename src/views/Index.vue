<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { signUp, idCheck, login } from '@/services/member'
import type { LoginRequest, LoginResponse } from '@/types/member'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const auth = useAuthStore()

async function doLogin() {
  const loginRequest: LoginRequest = {
    username: username.value,
    password: password.value,
  }

  try {
    const res = await login(loginRequest)
    console.log(res)
    //토큰 저장
    auth.setToken(res.data.access, res.data.refresh)
    await router.push('/main')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <h1 class="title">fftl-todo</h1>
  <div class="input">
    <h2>로그인해봐</h2>
    <span>아이디 : </span><input type="text" v-model="username" />
    <div></div>
    <span>비밀번호 : </span><input type="password" v-model="password" />
    <button @click="doLogin">로그인</button>
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
