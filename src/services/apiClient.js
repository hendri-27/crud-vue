import axios from 'axios'

const axiosConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

export const apiClient = axios.create(axiosConfig)

apiClient.interceptors.response.use(
  (response) => response,
  (e) => {
    const error = e.response?.data.error ?? true

    return Promise.resolve({
      data: {
        error
      }
    })
  }
)