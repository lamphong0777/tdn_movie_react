// src/hooks/useGenrePreview.js
import { useCallback, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { buildUrl } from '../utils/movieAdapter'

const useGenrePreview = () => {
  const [previews, setPreviews] = useState({}) // { slug: [movie1, movie2, movie3] }
  const [loadingSlugs, setLoadingSlugs] = useState({})

  const fetchPreview = useCallback(
    async (slug) => {
      // Đã có cache hoặc đang load → bỏ qua
      if (previews[slug] || loadingSlugs[slug]) return

      setLoadingSlugs((prev) => ({ ...prev, [slug]: true }))

      try {
        const response = await movieApi.getMoviesByGenrePreview(slug, 3)
        const items = response.data?.data?.items || response.data?.items || []
        const pathImage = response.data?.pathImage || ''

        const adapted = items.slice(0, 3).map((m) => ({
          id: m._id,
          title: m.name,
          image: buildUrl(m.thumb_url || m.poster_url, pathImage),
        }))

        setPreviews((prev) => ({ ...prev, [slug]: adapted }))
      } catch (err) {
        console.error('Fetch preview error:', err)
      } finally {
        setLoadingSlugs((prev) => ({ ...prev, [slug]: false }))
      }
    },
    [previews, loadingSlugs]
  )

  return { previews, loadingSlugs, fetchPreview }
}

export default useGenrePreview
