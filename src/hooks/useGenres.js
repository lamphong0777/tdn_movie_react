// src/hooks/useGenres.js — thêm cache đơn giản
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'

// Cache đơn giản ở module scope (tồn tại đến khi reload trang)
let genresCache = null
let genresPromise = null

const useGenres = () => {
  const [genres, setGenres] = useState(genresCache || [])
  const [loading, setLoading] = useState(!genresCache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (genresCache) return // Đã có cache

    let isMounted = true

    const fetchGenres = async () => {
      try {
        // Nếu đang có request khác → đợi
        if (genresPromise) {
          const data = await genresPromise
          if (isMounted) {
            setGenres(data)
            setLoading(false)
          }
          return
        }

        // Tạo promise mới
        genresPromise = movieApi.getGenres().then((response) => {
          const items = response.data?.data?.items || []
          const adapted = items.map((g) => ({
            _id: g._id,
            name: g.name,
            slug: g.slug,
          }))
          genresCache = adapted
          return adapted
        })

        const data = await genresPromise
        if (isMounted) {
          setGenres(data)
          setLoading(false)
        }
      } catch (err) {
        genresPromise = null
        if (isMounted && err.name !== 'CanceledError') {
          setError(err.message || 'Không thể tải thể loại')
        }
        if (isMounted) setLoading(false)
      }
    }

    fetchGenres()
    return () => {
      isMounted = false
    }
  }, [])

  return { genres, loading, error }
}

export default useGenres
