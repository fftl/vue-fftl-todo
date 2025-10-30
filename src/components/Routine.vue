<script setup lang="ts">
import { computed } from 'vue'
import type { Routine } from '@/types/routine'

const props = defineProps<{ routines: Routine[] }>()
const empty = computed(() => props.routines.length === 0)
</script>

<template>
  <div>
    <h2 v-if="empty">등록된 투두가 없습니다.</h2>
    <ul v-else>
      <li v-for="r in props.routines" :key="r.routineId">
        {{ r.routineId }} ({{ r.routineName }})
      </li>
    </ul>
  </div>
</template>
