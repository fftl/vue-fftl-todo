export interface ApiResponse<T> {
  success: number
  data?: T
  message?: string
}
