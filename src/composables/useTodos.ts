import { ref, onMounted } from 'vue'
import { addRoutine, getRoutines, makeTodos, deleteRoutine } from '@/services/routine'
import { getTodos, addTodo, checkTodo, deleteTodo } from '@/services/todo'
import type { Routine, RoutineRequest } from '@/types/routine'
import type { Todo } from '@/types/todo'

export function useTodos() {
  const text = ref('')
  const loading = ref(false)
  const todos = ref<Todo[]>([]) // ✅ 배열로 초기화
  const histories = ref<Todo[]>([])
  const routines = ref<Routine[]>([])

  onMounted(async () => {
    try {
      todos.value = await getTodos()
      routines.value = await getRoutines()
    } catch (e) {
      console.error(e)
    }
  })

  function onCreateRoutine() {
    const name = window.prompt('루틴 이름을 입력하세요') ?? ''
    console.log(todos.value)
    const texts = todos.value.map((t) => t.text)
    // RoutineRequest 객체 생성
    const request: RoutineRequest = {
      routineName: name.trim(),
      todos: texts,
    }

    if (!name?.trim()) return
    const data = addRoutine(request)
    console.log(data)
  }

  async function makeTodosByRoutine(routineId: number) {
    console.log(routineId)
    try {
      todos.value = await makeTodos(routineId)
      console.log(todos.value)
    } catch (e) {
      console.error(e)
    }
  }

  async function doAddTodo(q?: string) {
    const t = (q ?? text.value).trim()
    if (!t || loading.value) return
    loading.value = true
    try {
      const created = await addTodo(t) // Todo 한 건이 돌아온다고 가정
      console.log(created)
      todos.value.unshift(created)
      text.value = ''
    } catch (e) {
      console.error(e)
      alert('등록에 실패했어요.')
    } finally {
      loading.value = false
    }
  }

  function toggle(todo: Todo) {
    // 체크 토글 UI만 즉시 반영 (서버 반영 API 있으면 호출)
    checkTodo(todo.todoId)
    todo.checked = !todo.checked
  }

  function fmt(d: string) {
    // "2025-09-26" → 보기 좋게
    return new Date(d).toLocaleDateString()
  }

  async function removeTodo(todo: Todo) {
    try {
      await deleteTodo(todo.todoId) // /todos/{id} DELETE 같은 API
      todos.value = todos.value.filter((t) => t.todoId !== todo.todoId)
    } catch (e) {
      console.error(e)
      // TODO: 토스트로 "삭제 실패" 표시
    }
  }

  async function removeRoutine(routine: Routine) {
    try {
      await deleteTodo(routine.routineId) // /todos/{id} DELETE 같은 API
      routines.value = routines.value.filter((r) => r.routineId !== routine.routineId)
    } catch (e) {
      console.error(e)
      // TODO: 토스트로 "삭제 실패" 표시
    }
  }

  return {
    text,
    loading,
    todos,
    histories,
    routines,
    onCreateRoutine,
    makeTodosByRoutine,
    doAddTodo,
    removeTodo,
    toggle,
    fmt,
  }
}
