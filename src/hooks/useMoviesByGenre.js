// src/hooks/useMoviesByGenre.js
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { adaptMovies, buildUrl } from '../utils/movieAdapter'

/**
 * Hook lấy phim theo thể loại
 * @param {string} slug - slug thể loại ('all' để lấy phim mới cập nhật)
 * @param {number} page - trang hiện tại
 * @param {number} limit - số phim mỗi trang
 */
const useMoviesByGenre = (slug, page = 1, limit = 24) => {
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    let isMounted = true

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        // ✅ Nếu slug = 'all' → gọi API phim mới cập nhật
        // Ngược lại → gọi API theo thể loại
        const response =
          slug === 'all'
            ? await movieApi.getNewlyUpdated(page)
            : await movieApi.getMoviesByGenre(slug, { page, limit })

        if (!isMounted) return

        const items = response.data?.data?.items || response.data?.items || []
        const pathImage = response.data?.pathImage || ''

        const adapted = adaptMovies(items).map((m) => ({
          ...m,
          image: buildUrl(m.image, pathImage),
        }))

        setMovies(adapted)
        setPagination(response.data?.pagination || null)
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          setError(err.message || 'Không thể tải phim')
          console.error('Fetch movies by genre error:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchMovies()

    return () => {
      isMounted = false
    }
  }, [slug, page, limit])

  return { movies, pagination, loading, error }
}

export default useMoviesByGenre
