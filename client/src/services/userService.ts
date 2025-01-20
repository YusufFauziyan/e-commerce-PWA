import { get, post } from '@/utils/api/apiHelper'

export const getUserInfo = async () => {
  return await get('/collection/user/me')
}
