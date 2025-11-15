import api from '.'
import type { Todo } from '@/types/todo'
import type { ApiResponse } from '@/types/common'
import { onMounted } from 'vue'
import { httpDelete, httpGet, httpPost } from './http'
import type { Routine, RoutineRequest } from '@/types/routine'

export const getRoutines = () => httpGet<Routine[]>('/routine').then((r) => r)
export const addRoutine = (request: RoutineRequest) =>
  httpPost<Routine>('/routine', request).then((r) => r)
export const makeTodos = (routineId: number) =>
  httpPost<Todo[]>('/routine/make', { routineId }).then((r) => r)
export const deleteRoutine = (routineId: number) =>
  httpDelete(`/routine/${routineId}`).then((r) => r)
