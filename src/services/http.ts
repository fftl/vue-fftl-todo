import type { AxiosRequestConfig } from 'axios'
import api from '.'

export const httpGet = <T>(url: string, config?: AxiosRequestConfig) =>
  api.get(url, config) as unknown as Promise<T>

export const httpPost = <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
  api.post(url, body, config) as unknown as Promise<T>

export const httpPut = <T>(url: string, body?: any, config?: AxiosRequestConfig) =>
  api.put(url, body, config) as unknown as Promise<T>

export const httpDelete = <T>(url: string, config?: AxiosRequestConfig) =>
  api.delete(url, config) as unknown as Promise<T>
