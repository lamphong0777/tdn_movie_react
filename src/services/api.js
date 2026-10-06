import axiosInstance from '../config/axios'

const apiService = {
  get: (url, params = {}) => {
    return axiosInstance.get(url, { params })
  },

  post: (url, data = {}) => {
    return axiosInstance.post(url, data)
  },

  put: (url, data = {}) => {
    return axiosInstance.put(url, data)
  },

  patch: (url, data = {}) => {
    return axiosInstance.patch(url, data)
  },

  delete: (url, data = {}) => {
    return axiosInstance.delete(url, { data })
  },

  upload: (url, file, onProgress = null) => {
    const formData = new FormData()
    formData.append('file', file)

    return axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      },
    })
  },
}

export default apiService
