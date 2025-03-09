import { apiClient } from "@/services/apiClient"
const baseURL = process.env.VUE_APP_REQRES_BASE_URL

export const login = async (data) => {
  const response = await apiClient({
    baseURL,
    method: 'POST',
    url: '/login',
    data,
  })

  return response?.data
}

export const register = async (data) => {
  const response = await apiClient({
    baseURL,
    method: 'POST',
    url: '/register',
    data,
  })

  return response?.data
}
