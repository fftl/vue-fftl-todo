<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    as?: 'button' | 'a' | 'router-link'
    to?: string | Record<string, any>
    href?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { as: 'button', type: 'button' },
)

const tag = computed(() => (props.as === 'router-link' ? RouterLink : props.as))
</script>

<template>
  <component
    :is="tag"
    class="btn"
    :to="props.as === 'router-link' ? props.to : undefined"
    :href="props.as === 'a' ? props.href : undefined"
    :type="props.as === 'button' ? props.type : undefined"
  >
    <span><slot /></span>
  </component>
</template>

<style scoped>
.btn {
  border: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  background-color: var(--btn-bg, #222);
  padding: var(--btn-py, 17px) var(--btn-px, 60px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: var(--btn-radius, 8px);
}
.btn span {
  position: relative;
  z-index: 1;
}
.btn:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 490%;
  width: 140%;
  background: var(--btn-accent, #78c7d2);
  transition: all 0.5s ease-in-out;
  transform: translateX(-98%) translateY(-25%) rotate(45deg);
}
.btn:hover:after {
  transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
</style>
