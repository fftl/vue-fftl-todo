<script setup lang="ts">
import { ref } from 'vue'
import type { LoginRequest } from '@/types/member'
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
  <div class="signup-card">
    <h2 class="title">회원가입</h2>
    <p class="subtitle">간단히 가입하고 오늘의 할 일을 시작하세요</p>

    <div class="form-group">
      <label for="username">아이디</label>
      <div class="input-row">
        <input
          id="username"
          type="text"
          placeholder="아이디 (3자 이상)"
          v-model="username"
          class="input"
        />
        <button class="btn-secondary" @click="doIdCheck">중복확인</button>
      </div>
    </div>

    <div class="form-group">
      <label for="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="비밀번호 (8자 이상)"
        v-model="password"
        class="input"
      />
    </div>

    <div class="form-group">
      <label for="passwordCheck">비밀번호 확인</label>
      <input
        id="passwordCheck"
        type="password"
        placeholder="비밀번호를 다시 입력"
        v-model="passwordCheck"
        class="input"
      />
    </div>

    <button class="btn-primary" @click="doSignUp">회원 가입</button>
  </div>
</template>

<style scoped>
.signup-card {
  max-width: 420px;
  margin: 40px auto;
  padding: 32px 28px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 18px;
  text-align: left;
}

label {
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}
.input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.input-row {
  display: flex;
  gap: 8px;
}

.btn-primary {
  width: 100%;
  padding: 10px 0;
  background: #4a90e2;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 12px;
}
.btn-primary:hover {
  background: #4a90e2;
}

.btn-secondary {
  padding: 8px 12px;
  border: 1px solid #4a90e2;
  background: white;
  color: #2563eb;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
}
.btn-secondary:hover {
  background: #eff6ff;
}
</style>
