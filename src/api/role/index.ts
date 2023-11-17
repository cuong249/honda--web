import axiosClient from '../axiosClient'
import { Role } from '../types'

const roleApi = {
  create: async (data: Role) => {
    const response = await axiosClient.post(`/api/role`, data)

    return response
  },
  get: async (id: string) => {
    const response = await axiosClient.get(`/api/role/${id}`)

    return response
  },
  getList: async () => {
    const response = await axiosClient.get(`/api/role`)

    return response
  },
  update: async (id: string, data: Role) => {
    const response = await axiosClient.put(`/api/role/${id}`, data)

    return response
  },
  delete: async (id: string) => {
    const response = await axiosClient.delete(`/api/role/${id}`)

    return response
  }
}

export default roleApi
