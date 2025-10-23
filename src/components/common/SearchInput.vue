<!-- src/components/SearchInput.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    modelValue: '',
    placeholder: '검색어를 입력해주세요',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'submit', query: string): void
}>()

// v-model 양방향 바인딩
const value = computed({
  get: () => props.modelValue,
  set: (v: string) => emit('update:modelValue', v),
})

function onSubmit() {
  emit('submit', value.value.trim())
}
</script>

<template>
  <form class="si-bar" role="search" @submit.prevent="onSubmit">
    <input
      class="si-input"
      type="text"
      :placeholder="placeholder"
      v-model="value"
      :disabled="disabled"
      aria-label="검색어"
    />
    <button class="si-go" type="submit" :disabled="disabled" title="검색">
      <svg class="si-go-ic" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
      </svg>
    </button>
  </form>
</template>

<style scoped>
/* 커스텀 가능한 CSS 변수(부모에서 오버라이드 가능) */
:host,
.si-bar {
  --bar-bg: #fff;
  --bar-border: #e5e7eb;
  --text: #111827;
  --placeholder: #9ca3af;

  --btn-bg: #111827; /* 오른쪽 동그라미 */
  --btn-ic: #ffffff; /* 화살표 색 */
}

/* 바 전체(하얀 알약) */
.si-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  background: var(--bar-bg);
  border: 1px solid var(--bar-border);
  border-radius: 999px;
  padding: 10px 10px 10px 16px;
  box-sizing: border-box;
}

/* 입력 */
.si-input {
  flex: 1;
  background: transparent;
  border: 0;
  outline: none;
  color: var(--text);
  font-size: 15px;
}
.si-input::placeholder {
  color: var(--placeholder);
}

/* 제출 버튼(오른쪽 동그라미) */
.si-go {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 0;
  cursor: pointer;
  background: var(--btn-bg);
  display: grid;
  place-items: center;
}
.si-go:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.si-go-ic {
  width: 20px;
  height: 20px;
  fill: var(--btn-ic);
}
</style>
