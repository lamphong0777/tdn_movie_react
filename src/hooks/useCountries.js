// src/hooks/useCountries.js
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'

const useCountries = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchCountries = async () => {
      try {
        const response = await movieApi.getCountries()
        if (!isMounted) return

        // API trả về: { status, data: { items: [...] } }
        const items = response.data?.data?.items || []

        // Sắp xếp theo tên A-Z (localeCompare hỗ trợ tiếng Việt)
        const sorted = items
          .map((c) => ({
            _id: c._id,
            name: c.name,
            slug: c.slug,
          }))
          .sort((a, b) => a.name.localeCompare(b.name, 'vi'))

        setCountries(sorted)
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          setError(err.message || 'Không thể tải quốc gia')
          console.error('Fetch countries error:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCountries()
    return () => {
      isMounted = false
    }
  }, [])

  return { countries, loading, error }
}

export default useCountries
