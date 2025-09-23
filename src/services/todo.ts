import api from './index'

export const addTodo = (text: string) => api.post('/todo', { text })
