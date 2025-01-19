import { get, post } from '@/utils/api/apiHelper'

export const login = async (email: string, password: string) => {
  return await post('/auth/login', { email, password })
}

export const loginWithGoogle = async (token: string) => {
  return await post('/auth/google-login', { token })
}
