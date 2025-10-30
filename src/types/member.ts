export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
}

export interface SignUpRequest {
  username: string
  password: string
  email: string
}

export interface EmailValid {
  formatValid: boolean
  mxFound: boolean
  disposable: boolean
  suggestion: string
}
