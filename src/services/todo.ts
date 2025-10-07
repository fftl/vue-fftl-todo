import api from '.'
import type { Todo } from '@/types/todo'
import { onMounted } from 'vue'

export const getTodos = () => api.get<Todo[]>('/todo').then((r) => r.data)
export const getTodoesDay = (date: string) =>
  api.get<Todo[]>(`/todo/day?date=${date}`).then((r) => r.data)
export const checkTodo = (todoId: number) => api.post('/todo/check', { todoId }).then((r) => r.data)
export const addTodo = (text: string) => api.post<Todo>('/todo', { text }).then((r) => r.data) // 컨트롤러가 @RequestBody Map<String,String> 받는 형태
