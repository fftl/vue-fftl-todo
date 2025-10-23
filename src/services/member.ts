import type { LoginRequest, EmailValid } from '@/types/member'
import api from './index'

export const signUp = (data: LoginRequest) =>
  api.post('/member', data).then((r) => {
    r.data.data
  })
export const idCheck = (data: string) =>
  api.get(`/member/${data}`).then((r) => {
    r.data
  })
export const login = (data: LoginRequest) => api.post('/member/login', data)
export const emailValidate = (email: string) =>
  api.post<EmailValid>(`/member/email/valid?email=${email}`).then((r) => r.data)
