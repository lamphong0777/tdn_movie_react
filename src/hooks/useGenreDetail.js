// src/hooks/useGenreDetail.js
import { useMemo } from 'react'
import useGenres from './useGenres'

/**
 * Lấy thông tin chi tiết của 1 thể loại từ danh sách
 * (API không có endpoint /the-loai/:slug/detail nên tái sử dụng useGenres)
 */
const useGenreDetail = (slug) => {
  const { genres, loading, error } = useGenres()

  const genre = useMemo(() => {
    return genres.find((g) => g.slug === slug) || null
  }, [genres, slug])

  return { genre, loading, error }
}

export default useGenreDetail
