const isValidUrl = (value) => {
  return typeof value === 'string' && value.length > 0
}

const buildUrl = (path, pathImage) => {
  if (!isValidUrl(path)) return ''
  return path.startsWith('http') ? path : `${pathImage}${path}`
}

export const adaptMovie = (item) => {
  const rating = parseFloat(item.tmdb?.vote_average) || 0

  const thumbUrl = isValidUrl(item.thumb_url) ? item.thumb_url : ''
  const posterUrl = isValidUrl(item.poster_url) ? item.poster_url : ''

  const image = thumbUrl || posterUrl || ''

  const currentYear = new Date().getFullYear()
  const isNew = item.year >= currentYear
  const isHot = rating >= 8.0

  return {
    id: item._id,
    title: item.name,
    originName: item.origin_name,
    slug: item.slug,
    image,
    poster: posterUrl || thumbUrl,
    year: item.year,
    rating,
    voteCount: item.tmdb?.vote_count || 0,
    type: item.tmdb?.type,
    isSeries: item.tmdb?.type === 'tv',
    seasonNumber: item.tmdb?.season,
    isNew,
    isHot,
    duration: null,
  }
}

export const adaptMovies = (items = []) => {
  return items.map((item) => adaptMovie(item))
}

export { buildUrl, isValidUrl }
