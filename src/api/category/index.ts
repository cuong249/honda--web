import axiosClient from '../axiosClient'
import { Category } from '../types'

const CategoryApi = {
  create: async (data: Category) => {
    const response = await axiosClient.post(`/api/category`, data)

    return response
  },
  get: async (id: string) => {
    const response = await axiosClient.get(`/api/category/${id}`)

    return response
  },
  getList: async () => {
    const response = await axiosClient.get(`/api/category`)

    return response
  },
  update: async (id: string, data: Category) => {
    const response = await axiosClient.put(`/api/category/${id}`, data)

    return response
  },
  delete: async (id: string) => {
    const response = await axiosClient.delete(`/api/category/${id}`)

    return response
  }
}

export default CategoryApi
