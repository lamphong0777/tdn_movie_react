// src/utils/bannerAdapter.js

/**
 * Kiểm tra giá trị có phải string hợp lệ không
 * (vì API có thể trả về {} cho poster_url)
 */
const isValidUrl = (value) => {
  return typeof value === 'string' && value.length > 0
}

/**
 * Build URL đầy đủ
 */
const buildUrl = (path, pathImage) => {
  if (!isValidUrl(path)) return ''
  return path.startsWith('http') ? path : `${pathImage}${path}`
}

export const adaptBannerMovie = (item, pathImage = '') => {
  const rating = parseFloat(item.tmdb?.vote_average) || 0

  // ✅ Dùng isValidUrl để tránh lỗi khi poster_url = {}
  const thumbUrl = isValidUrl(item.thumb_url) ? item.thumb_url : ''
  const posterUrl = isValidUrl(item.poster_url) ? item.poster_url : ''

  // Ưu tiên thumb (ngang) cho banner, fallback sang poster (dọc)
  const bannerUrl = buildUrl(thumbUrl || posterUrl, pathImage)

  return {
    id: item._id,
    title: item.name,
    originName: item.origin_name,
    slug: item.slug,
    banner: bannerUrl,
    poster: buildUrl(posterUrl, pathImage) || bannerUrl,
    year: item.year,
    rating,
    voteCount: item.tmdb?.vote_count || 0,
    type: item.tmdb?.type,
    isSeries: item.tmdb?.type === 'tv',
    seasonNumber: item.tmdb?.season,
    duration: null,
    genre: [],
    description: null,
  }
}

export const pickBannerMovies = (items = [], pathImage = '', limit = 5) => {
  if (!items.length) return []

  const now = new Date().getFullYear()

  const scored = items
    .map((item) => {
      const rating = parseFloat(item.tmdb?.vote_average) || 0
      const voteCount = item.tmdb?.vote_count || 0

      // ✅ Kiểm tra type trước khi dùng
      const hasBanner = isValidUrl(item.thumb_url) || isValidUrl(item.poster_url)
      const isRecent = item.year >= now - 1

      let score = 0
      score += rating * 10
      score += hasBanner ? 20 : 0
      score += isRecent ? 15 : 0
      score += Math.min(voteCount / 100, 10)

      return { item, score, hasBanner }
    })
    // ✅ Filter bằng hasBanner đã tính sẵn (tránh gọi lại isValidUrl)
    .filter((x) => x.hasBanner)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scored.map(({ item }) => adaptBannerMovie(item, pathImage))
}
