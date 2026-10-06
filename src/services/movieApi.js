// src/services/movieApi.js
import apiService from './api'

export const movieApi = {
  getNewlyUpdated: (page = 1) => {
    return apiService.get('/danh-sach/phim-moi-cap-nhat', { page })
  },

  getGenres: () => {
    return apiService.get('/the-loai')
  },

  getMoviesByGenre: (slug, { page = 1, limit = 20 } = {}) => {
    return apiService.get(`/the-loai/${slug}`, { page, limit })
  },

  getMoviesByGenrePreview: (slug, limit = 3) => {
    return apiService.get(`/the-loai/${slug}`, { page: 1, limit })
  },

  getMovieList: ({ type = 'series', page = 1, limit = 24 } = {}) => {
    return apiService.get('/danh-sach', { type, page, limit })
  },

  getYears: () => {
    return apiService.get('/nam')
  },

  getMoviesByYear: (year, { type = 'series', page = 1, limit = 20, status = '' } = {}) => {
    const params = { page, limit }
    if (type) params.type = type
    if (status) params.status = status
    return apiService.get(`/nam/${year}`, params)
  },

  searchMovies: (keyword, { page = 1, limit = 20 } = {}) => {
    return apiService.get('/tim-kiem', { keyword, page, limit })
  },

  getCountries: () => {
    return apiService.get('/quoc-gia')
  },

  getMoviesByCountry: (slug, { page = 1, limit = 24, year = '', type = '', status = '' } = {}) => {
    const params = { page, limit }
    if (year) params.year = year
    if (type) params.type = type
    if (status) params.status = status
    return apiService.get(`/quoc-gia/${slug}`, params)
  },

  getMovieDetail: (slug) => {
    return apiService.get(`/phim/${slug}`)
  },
}
