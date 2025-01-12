import { get, post, put, del } from '@/utils/api/apiHelper'

export const getAllProducts = async (params: { [key: string]: any }) => {
  return await get('/collection/product', params)
}

export const getProductById = async (id: string) => {
  return await get(`/collection/product/${id}`)
}

export const createProduct = async (product: any) => {
  return await post('/collection/product', product)
}

export const updateProduct = async (id: string, product: any) => {
  return await put(`/collection/product/${id}`, product)
}

export const deleteProduct = async (id: string) => {
  return await del(`/collection/product/${id}`)
}
