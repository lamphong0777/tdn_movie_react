import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (window.loadingBarRef) {
      window.loadingBarRef.continuousStart()
    }

    return config
  },
  (error) => {
    if (window.loadingBarRef) {
      window.loadingBarRef.complete()
    }
    return Promise.reject(error)
  }
)

// Interceptor response
axiosInstance.interceptors.response.use(
  (response) => {
    if (window.loadingBarRef) {
      window.loadingBarRef.complete()
    }
    return response
  },
  (error) => {
    if (window.loadingBarRef) {
      window.loadingBarRef.complete()
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          break
        case 403:
          console.error('Bạn không có quyền truy cập')
          break
        case 404:
          console.error('Không tìm thấy dữ liệu')
          break
        case 500:
          console.error('Lỗi server')
          break
        default:
          console.error('Đã có lỗi xảy ra')
      }
    } else if (error.request) {
      console.error('Không thể kết nối đến server')
    } else {
      console.error('Lỗi cấu hình request', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
