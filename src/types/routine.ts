export interface RoutineRequest {
  routineName: string
  todos: string[]
}

export interface RoutineResponse {
  routineName: string
  routineId: number
}

export interface Routine {
  routineId: number
  routineName: string
}
