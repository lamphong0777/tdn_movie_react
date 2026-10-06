// src/hooks/useMoviesList.js
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { adaptMovies, buildUrl } from '../utils/movieAdapter'

/**
 * Hook lấy danh sách phim theo type (series/single/hoathinh/tvshows)
 * @param {object} options
 * @param {string} options.type - 'series' | 'single' | 'hoathinh' | 'tvshows'
 * @param {string} options.year - năm cần filter ('all' để lấy tất cả)
 * @param {number} options.page - trang hiện tại
 * @param {number} options.limit - số phim mỗi trang
 */
const useMoviesList = ({ type = 'series', year = 'all', page = 1, limit = 24 } = {}) => {
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        const response =
          year === 'all'
            ? await movieApi.getMovieList({ type, page, limit })
            : await movieApi.getMoviesByYear(year, { type, page, limit })

        if (!isMounted) return

        const items = response.data?.items || []
        const pathImage = response.data?.pathImage || ''

        const adapted = adaptMovies(items).map((m) => ({
          ...m,
          image: buildUrl(m.image, pathImage),
        }))

        setMovies(adapted)
        setPagination(response.data?.pagination || null)
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          setError(err.message || 'Không thể tải danh sách phim')
          console.error('Fetch movies error:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchMovies()

    return () => {
      isMounted = false
    }
  }, [type, year, page, limit])

  return { movies, pagination, loading, error }
}

export default useMoviesList
