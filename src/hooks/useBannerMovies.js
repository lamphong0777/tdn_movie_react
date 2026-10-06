// src/hooks/useBannerMovies.js
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { pickBannerMovies } from '../utils/bannerAdapter'

const useBannerMovies = (limit = 5) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchBannerMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await movieApi.getNewlyUpdated(1)

        if (!isMounted) return

        const items = response.data?.items || []
        const pathImage = response.data?.pathImage || ''

        const banners = pickBannerMovies(items, pathImage, limit)
        setMovies(banners)
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          setError(err.message || 'Không thể tải banner')
          console.error('Fetch banner error:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchBannerMovies()

    return () => {
      isMounted = false
    }
  }, [limit])

  return { movies, loading, error }
}

export default useBannerMovies
