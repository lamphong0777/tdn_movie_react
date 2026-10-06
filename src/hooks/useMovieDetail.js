import { useEffect, useState } from 'react'
import { movieApi } from '../services/movieApi'
import { buildUrl } from '../utils/movieAdapter'

const adaptMovieDetail = (raw, pathImage = '') => {
  if (!raw) return null

  return {
    id: raw._id,
    tmdbId: raw.tmdb?.id,
    tmdbType: raw.tmdb?.type,
    imdbId: raw.imdb?.id,
    name: raw.name,
    originName: raw.origin_name,
    slug: raw.slug,
    content: raw.content, // mô tả dài
    type: raw.type, // 'series' | 'single' | 'hoathinh' | 'tvshows'
    isSeries: raw.type === 'series',
    status: raw.status, // 'ongoing' | 'completed' | 'trailer'
    statusLabel:
      raw.status === 'ongoing'
        ? 'Đang chiếu'
        : raw.status === 'completed'
          ? 'Hoàn thành'
          : raw.status === 'trailer'
            ? 'Trailer'
            : raw.status,
    posterUrl: buildUrl(raw.poster_url, pathImage),
    thumbUrl: buildUrl(raw.thumb_url, pathImage),
    trailerUrl: raw.trailer_url,
    time: raw.time, // '45 phút'
    episodeCurrent: raw.episode_current, // 'Tập 14'
    episodeTotal: raw.episode_total, // '30'
    quality: raw.quality, // 'HD'
    lang: raw.lang, // 'Vietsub'
    notify: raw.notify,
    showtimes: raw.showtimes,
    year: raw.year,
    keywords: raw.keywords || [],
    view: raw.view || 0,
    chieurap: raw.chieurap, // có phải phim chiếu rạp
    subDocquyen: raw.sub_docquyen, // phụ đề độc quyền
    actors: raw.actor || [],
    directors: raw.director || [],
    categories: raw.category || [], // thể loại
    countries: raw.country || [],
    tmdb: raw.tmdb,
    modified: raw.modified?.time,
    created: raw.created?.time,
  }
}

/**
 * Chuẩn hóa dữ liệu episodes
 * Response: [{ server_name, server_data: [{name, slug, filename, link_embed}] }]
 */
const adaptEpisodes = (raw) => {
  if (!Array.isArray(raw)) return []

  return raw.map((server) => ({
    // Server name có thể có ký tự xuống dòng, làm sạch
    serverName: (server.server_name || '').replace(/\s+/g, ' ').trim(),
    episodes: (server.server_data || []).map((ep) => ({
      name: ep.name, // '1', '2', ...
      slug: ep.slug, // 'tap-1'
      filename: ep.filename,
      linkEmbed: ep.link_embed, // URL iframe
      linkM3u8: ep.link_m3u8 || null,
    })),
  }))
}

const useMovieDetail = (slug) => {
  const [movie, setMovie] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    let isMounted = true

    const fetchDetail = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await movieApi.getMovieDetail(slug)
        if (!isMounted) return

        // API response: { status, msg, movie, episodes }
        const rawMovie = response.data?.movie
        const rawEpisodes = response.data?.episodes || []

        setMovie(adaptMovieDetail(rawMovie))
        setEpisodes(adaptEpisodes(rawEpisodes))
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          setError(err.message || 'Không thể tải thông tin phim')
          console.error('Fetch movie detail error:', err)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchDetail()

    return () => {
      isMounted = false
    }
  }, [slug])

  return { movie, episodes, loading, error }
}

export default useMovieDetail
