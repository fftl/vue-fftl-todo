import api from '.'
import type { Todo } from '@/types/todo'
import type { ApiResponse } from '@/types/common'
import { onMounted } from 'vue'
import { httpGet, httpPost } from './http'

export const getTodos = () => httpGet<Todo[]>('/todo').then((r) => r)
export const getTodoesDay = (date: string) =>
  httpGet<Todo[]>(`/todo/day?date=${date}`).then((r) => r)
export const checkTodo = (todoId: number) => httpPost('/todo/check', { todoId }).then((r) => r)
export const addTodo = (text: string) => httpPost<Todo>('/todo', { text }).then((r) => r) // 컨트롤러가 @RequestBody Map<String,String> 받는 형태
