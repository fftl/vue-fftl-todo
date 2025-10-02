<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { login } from '@/services/member'
import type { LoginRequest } from '@/types/member'
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
    auth.setToken(res.data.access, res.data.refresh)
    await router.push('/main')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="container">
    <h1 class="title">todo</h1>
    <p class="subtitle">오늘을 정돈하는 가장 간단한 방법</p>

    <div class="form-group">
      <label for="username">아이디</label>
      <input id="username" type="text" v-model="username" placeholder="아이디를 입력하세요" />
    </div>

    <div class="form-group">
      <label for="password">비밀번호</label>
      <input id="password" type="password" v-model="password" placeholder="비밀번호를 입력하세요" />
    </div>

    <button class="login-btn" @click="doLogin">로그인</button>

    <RouterLink class="signup-link" to="/signup">회원가입</RouterLink>
  </div>
</template>

<style scoped>
.container {
  max-width: 360px;
  margin: 80px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #555;
  margin-bottom: 24px;
}

.form-group {
  text-align: left;
  margin-bottom: 16px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 6px rgba(74, 144, 226, 0.3);
}

.login-btn {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: #4a90e2;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #3a78c2;
}

.signup-link {
  display: block;
  margin-top: 16px;
  text-decoration: none;
  color: #4a90e2;
  font-weight: bold;
  transition: color 0.2s;
}

.signup-link:hover {
  color: #2d5f9f;
}
</style>
