import api from '.'
import type { Todo } from '@/types/todo'
import type { ApiResponse } from '@/types/common'
import { onMounted } from 'vue'

export const getTodos = () => api.get<ApiResponse<Todo[]>>('/todo').then((r) => r.data.data)
export const getTodoesDay = (date: string) =>
  api.get<ApiResponse<Todo[]>>(`/todo/day?date=${date}`).then((r) => r.data.data)
export const checkTodo = (todoId: number) =>
  api.post('/todo/check', { todoId }).then((r) => r.data.data)
export const addTodo = (text: string) =>
  api.post<ApiResponse<Todo>>('/todo', { text }).then((r) => r.data.data) // 컨트롤러가 @RequestBody Map<String,String> 받는 형태
