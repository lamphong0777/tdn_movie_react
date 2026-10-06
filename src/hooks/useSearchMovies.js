// src/hooks/useSearchMovies.js
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { adaptMovies, buildUrl } from '../utils/movieAdapter'

const useSearchMovies = (keyword, debounceMs = 400, limit = 8) => {
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const trimmed = keyword?.trim() || ''

  useEffect(() => {
    // ✅ Không setState đồng bộ — chỉ fetch khi có keyword
    if (!trimmed) return

    let isMounted = true

    const timer = setTimeout(async () => {
      if (!isMounted) return

      setLoading(true)
      setError(null)

      try {
        const response = await movieApi.searchMovies(trimmed, {
          page: 1,
          limit,
        })

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
          setError(err.message || 'Không thể tìm kiếm')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }, debounceMs)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [trimmed, debounceMs, limit])

  // ✅ Tính giá trị trả về dựa trên keyword
  // Khi keyword rỗng, trả về giá trị mặc định ngay (không cần state)
  return {
    movies: trimmed ? movies : [],
    pagination: trimmed ? pagination : null,
    loading: trimmed ? loading : false,
    error: trimmed ? error : null,
  }
}

export default useSearchMovies
