<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SignUpRequest } from '@/types/member'
import { idCheck, signUp, emailValidate } from '@/services/member'

const username = ref('')
const password = ref('')
const passwordCheck = ref('')

const email = ref('')
const emailConfirm = ref('')

// 아이디 검사 상태 추가
type IdStatus = 'idle' | 'checking' | 'available' | 'duplicate'
const idStatus = ref<IdStatus>('idle')
const idMsg = ref('')

// 이메일 검사 상태
type EmailStatus = 'idle' | 'checking' | 'ok' | 'error'
const emailStatus = ref<EmailStatus>('idle')
const emailMsg = ref('')

// 버튼 중복 클릭 방지
const loadingIdCheck = ref(false)
const loadingEmailCheck = ref(false)
const loadingSignUp = ref(false)

// 아이디 입력이 바뀌면 검사 상태 리셋
watch(username, () => {
  idStatus.value = 'idle'
  idMsg.value = ''
})

async function doIdCheck() {
  if (!username.value || username.value.trim().length < 5) {
    idStatus.value = 'idle'
    idMsg.value = ''
    return
  }

  loadingIdCheck.value = true
  idStatus.value = 'checking'
  idMsg.value = '확인 중...'

  try {
    const result = await idCheck(username.value)
    // idCheck API가 { available: boolean } 형태로 반환한다고 가정
    // 실제 API 응답 구조에 맞게 수정하세요
    if (!result) {
      idStatus.value = 'available'
      idMsg.value = '사용 가능한 아이디입니다.'
    } else {
      idStatus.value = 'duplicate'
      idMsg.value = '이미 사용 중인 아이디입니다. 다른 아이디를 입력해 주세요.'
    }
  } catch (e) {
    idStatus.value = 'duplicate'
    idMsg.value = '아이디 확인 중 오류가 발생했습니다.'
  } finally {
    loadingIdCheck.value = false
  }
}

// 이메일 더블 입력 일치 여부
const emailMatch = computed(() => email.value.trim() !== '' && email.value === emailConfirm.value)
// 비밀번호 규칙 및 일치
const passwordValid = computed(() => password.value.length >= 8)
const passwordMatch = computed(
  () => password.value !== '' && password.value === passwordCheck.value,
)
// 아이디 규칙
const usernameValid = computed(() => username.value.trim().length >= 5)

// 이메일 검사가 통과되었는지
const emailValidatedOk = computed(() => emailStatus.value === 'ok')

// 아이디 검사가 통과되었는지
const idValidatedOk = computed(() => idStatus.value === 'available')

// 회원가입 버튼 활성화 조건
const canSubmit = computed(
  () =>
    usernameValid.value &&
    idValidatedOk.value &&
    passwordValid.value &&
    passwordMatch.value &&
    emailMatch.value &&
    emailValidatedOk.value &&
    !loadingSignUp.value,
)

// 이메일 입력이 바뀌면 검사 상태 리셋
watch([email, emailConfirm], () => {
  emailStatus.value = 'idle'
  emailMsg.value = ''
})

async function doEmailCheck() {
  if (!emailMatch.value) {
    emailStatus.value = 'error'
    emailMsg.value = '이메일이 서로 일치하지 않습니다.'
    return
  }
  if (!email.value.includes('@')) {
    emailStatus.value = 'error'
    emailMsg.value = '이메일 형식을 확인해 주세요.'
    return
  }

  loadingEmailCheck.value = true
  emailStatus.value = 'checking'
  emailMsg.value = '이메일 검사 중...'

  try {
    const r = await emailValidate(email.value.trim())

    if (!r.formatValid) {
      emailStatus.value = 'error'
      emailMsg.value = '이메일 형식이 올바르지 않습니다.'
    } else if (!r.mxFound) {
      emailStatus.value = 'error'
      emailMsg.value = '수신 가능한 메일 서버(MX)가 없어 보입니다.'
    } else if (r.disposable) {
      emailStatus.value = 'error'
      emailMsg.value = '일회용/임시 이메일 도메인은 사용할 수 없습니다.'
    } else {
      emailStatus.value = 'ok'
      emailMsg.value = r.suggestion
        ? `사용 가능한 이메일입니다. 혹시 '${r.suggestion}'(으)로 쓰려던 건가요?`
        : '사용 가능한 이메일입니다.'
    }
  } catch (e) {
    emailStatus.value = 'error'
    emailMsg.value = '이메일 검사 중 오류가 발생했습니다. 다시 시도해 주세요.'
  } finally {
    loadingEmailCheck.value = false
  }
}

async function doSignUp() {
  if (!canSubmit.value) return
  loadingSignUp.value = true
  const signUpRequest: SignUpRequest = {
    username: username.value.trim(),
    password: password.value,
    email: email.value.trim(),
  }
  try {
    await signUp(signUpRequest)
    // TODO: 성공 후 라우팅/알림
  } finally {
    loadingSignUp.value = false
  }
}
</script>

<template>
  <div class="signup-card">
    <h2 class="title">회원가입</h2>
    <p class="subtitle">간단히 가입하고 오늘의 할 일을 시작하세요</p>

    <!-- 아이디 -->
    <div class="form-group">
      <label for="username">아이디</label>
      <div class="input-row">
        <input
          id="username"
          type="text"
          placeholder="아이디 (5자 이상)"
          v-model="username"
          class="input"
          :class="{ invalid: username && !usernameValid }"
        />
        <button
          class="btn-secondary"
          :disabled="loadingIdCheck || !usernameValid"
          @click="doIdCheck"
        >
          {{ loadingIdCheck ? '확인 중...' : '중복확인' }}
        </button>
      </div>
      <p v-if="username && !usernameValid" class="hint error">아이디는 5자 이상이어야 합니다.</p>
      <p v-if="idStatus === 'checking'" class="hint">아이디 확인 중...</p>
      <p v-if="idStatus === 'available'" class="hint success">{{ idMsg }}</p>
      <p v-if="idStatus === 'duplicate'" class="hint error">{{ idMsg }}</p>
    </div>

    <!-- 비밀번호 -->
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="비밀번호 (8자 이상)"
        v-model="password"
        class="input align-to-button"
        :class="{ invalid: password && !passwordValid }"
      />
      <p v-if="password && !passwordValid" class="hint error">비밀번호는 8자 이상이어야 합니다.</p>
    </div>

    <!-- 비밀번호 확인 -->
    <div class="form-group">
      <label for="passwordCheck">비밀번호 확인</label>
      <input
        id="passwordCheck"
        type="password"
        placeholder="비밀번호 다시 입력"
        v-model="passwordCheck"
        class="input align-to-button"
        :class="{ invalid: passwordCheck && !passwordMatch }"
      />
      <p v-if="passwordCheck && !passwordMatch" class="hint error">
        비밀번호가 서로 일치하지 않습니다.
      </p>
    </div>

    <!-- 이메일 -->
    <div class="form-group">
      <label for="email">이메일</label>
      <input
        id="email"
        type="email"
        placeholder="example@domain.com"
        v-model="email"
        class="input align-to-button"
      />
    </div>

    <!-- 이메일 확인 + 이메일 체크 -->
    <div class="form-group">
      <label for="emailConfirm">이메일 확인</label>
      <div class="input-row">
        <input
          id="emailConfirm"
          type="email"
          placeholder="이메일 다시 입력"
          v-model="emailConfirm"
          class="input"
          :class="{ invalid: emailConfirm && !emailMatch }"
        />
        <button
          class="btn-secondary"
          :disabled="loadingEmailCheck || !emailMatch"
          @click="doEmailCheck"
        >
          {{ loadingEmailCheck ? '검사 중...' : '이메일 체크' }}
        </button>
      </div>

      <!-- 이메일 관련 메시지 -->
      <p v-if="emailConfirm && !emailMatch" class="hint error">이메일이 서로 일치하지 않습니다.</p>
      <p v-if="emailStatus === 'checking'" class="hint">이메일 검사 중...</p>
      <p v-if="emailStatus === 'ok'" class="hint success">{{ emailMsg }}</p>
      <p v-if="emailStatus === 'error'" class="hint error">{{ emailMsg }}</p>
    </div>

    <button class="btn-primary" :disabled="!canSubmit" @click="doSignUp">
      {{ loadingSignUp ? '가입 중...' : '회원 가입' }}
    </button>
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
  --side-actions-width: 108px;
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
.input.invalid {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.input-row {
  display: flex;
  gap: 8px;
  align-items: center;
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
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  min-width: 100px;
  padding: 8px 0;
  border: 1px solid #4a90e2;
  background: white;
  color: #2563eb;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  flex-shrink: 0;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 420px) {
  .signup-card {
    --side-actions-width: 0px;
  }
  .input.align-to-button {
    width: 100%;
  }
}

.input.align-to-button {
  width: calc(100% - var(--side-actions-width));
}

.hint {
  font-size: 0.85rem;
  margin-top: 6px;
}
.hint.error {
  color: #b91c1c;
}
.hint.success {
  color: #047857;
}
</style>
