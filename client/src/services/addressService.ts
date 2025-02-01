import { get, post, put, del } from '@/utils/api/apiHelper'

export const getAllAddress = async (params: { [key: string]: any }) => {
  return await get('/collection/address', params)
}

export const getAddressById = async (id: string) => {
  return await get(`/collection/address/${id}`)
}

export const createAddress = async (data: { [key: string]: any }) => {
  return await post('/collection/address', data)
}

export const updateAddress = async (id: string, data: { [key: string]: any }) => {
  return await put(`/collection/address/${id}`, data)
}

export const deleteAddress = async (id: string) => {
  return await del(`/collection/address/${id}`)
}
