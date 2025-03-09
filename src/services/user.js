import { apiClient } from "./apiClient"
const baseURL = process.env.VUE_APP_JSONPLACEHOLDER_BASE_URL

export const get = async () => {
  const response = await apiClient({
    baseURL,
    method: 'GET',
    url: '/users',
  })

  return response?.data
}

export const store = async (data) => {
  const response = await apiClient({
    baseURL,
    method: 'POST',
    url: '/users',
    data,
  })

  return response?.data
}

export const update = async (id, data) => {
  const response = await apiClient({
    baseURL,
    method: 'PUT',
    url: `/users/${id}`,
    data,
  })

  return response?.data
}

export const singleDelete = async (id) => {
  const response = await apiClient({
    baseURL,
    method: 'DELETE',
    url: `/users/${id}`,
  })

  return response?.status == 200
}