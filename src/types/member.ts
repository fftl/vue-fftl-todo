export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
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
