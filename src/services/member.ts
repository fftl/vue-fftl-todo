import type { LoginRequest } from '@/types/member'
import api from './index'

export const signUp = (data: LoginRequest) => api.post('/member', data)
export const idCheck = (data: string) => api.get(`/member/${data}`)
export const login = (data: LoginRequest) => api.post('/member/login', data)
