// src/hooks/useYears.js
import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'

const useYears = () => {
  const [years, setYears] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchYears = async () => {
      try {
        const response = await movieApi.getYears()
        if (!isMounted) return

        const items = response.data?.data?.items || []

        // API trả về [{_id: "2050", name: "2050", slug: "2050"}, ...]
        // Sắp xếp giảm dần + chỉ lấy năm <= năm hiện tại
        const currentYear = new Date().getFullYear()
        const adapted = items
          .map((y) => ({
            _id: y._id,
            name: y.name,
            slug: y.slug,
            value: parseInt(y.name, 10),
          }))
          .filter((y) => y.value <= currentYear + 1) // cho phép năm sau 1 năm
          .sort((a, b) => b.value - a.value)

        setYears(adapted)
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          setError(err.message || 'Không thể tải danh sách năm')
          console.error('Fetch years error:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchYears()
    return () => {
      isMounted = false
    }
  }, [])

  return { years, loading, error }
}

export default useYears
