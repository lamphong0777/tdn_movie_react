// src/hooks/useSearchMovies.js
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { adaptMovies, buildUrl } from '../utils/movieAdapter'

const useSearchMovies = (keyword, debounceMs = 400, limit = 8) => {
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState(null) // ✅ Có state này
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const trimmed = keyword?.trim() || ''

    if (!trimmed) {
      setMovies([])
      setPagination(null) // ✅ Reset
      setError(null)
      setLoading(false)
      return
    }

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
        setPagination(response.data?.pagination || null) // ✅ Set pagination
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
  }, [keyword, debounceMs, limit])

  // ✅ Return pagination
  return { movies, pagination, loading, error }
}

export default useSearchMovies
