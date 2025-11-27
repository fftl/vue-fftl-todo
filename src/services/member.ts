import type { LoginRequest, EmailValid, LoginResponse } from '@/types/member'
import api from './index'
import { httpGet, httpPost } from './http'

export const signUp = (data: LoginRequest) => httpPost('/member', data).then((r) => r)
export const idCheck = (data: string) => httpGet(`/member/${data}`).then((r) => r)
export const login = (data: LoginRequest) =>
  httpPost<LoginResponse>('/member/login', data).then((r) => r)

export const emailValidate = (email: string) =>
  httpPost<EmailValid>(`/member/email/valid?email=${email}`).then((r) => r)
