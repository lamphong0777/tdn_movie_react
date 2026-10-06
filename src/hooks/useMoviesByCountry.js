import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { adaptMovies, buildUrl } from '../utils/movieAdapter'

/**
 * Hook lấy phim theo quốc gia
 * @param {object} options
 * @param {string} options.slug - slug quốc gia ('nhat-ban')
 * @param {string} options.year - năm filter ('' = tất cả)
 * @param {string} options.type - loại phim ('series' | 'single' | 'hoathinh' | 'tvshows' | '')
 * @param {string} options.status - trạng thái ('completed' | 'ongoing' | '')
 * @param {number} options.page - trang hiện tại
 * @param {number} options.limit - số phim mỗi trang
 */
const useMoviesByCountry = ({
  slug,
  year = '',
  type = '',
  status = '',
  page = 1,
  limit = 24,
} = {}) => {
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
        const response = await movieApi.getMoviesByCountry(slug, {
          page,
          limit,
          year,
          type,
          status,
        })

        if (!isMounted) return

        // API /quoc-gia/{slug} trả về: { status, items, pagination }
        const items = response.data?.items || response.data?.data?.items || []
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
          console.error('Fetch movies by country error:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchMovies()

    return () => {
      isMounted = false
    }
  }, [slug, year, type, status, page, limit])

  return { movies, pagination, loading, error }
}

export default useMoviesByCountry
