// src/pages/MovieDetail.jsx
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Globe,
  Heart,
  Play,
  Share2,
  Star,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EpisodeList from '../components/EpisodeList'
import VideoPlayer from '../components/VideoPlayer'
import useMovieDetail from '../hooks/useMovieDetail'

/**
 * Inner component — nhận slug qua prop
 */
const MovieDetailContent = ({ slug }) => {
  const navigate = useNavigate()
  const { movie, episodes, loading, error } = useMovieDetail(slug)

  // State chọn tập hiện tại
  const [currentEpisode, setCurrentEpisode] = useState(null)
  const [prevEpisodes, setPrevEpisodes] = useState(episodes)

  if (episodes !== prevEpisodes) {
    setPrevEpisodes(episodes)
    if (episodes.length > 0 && episodes[0].episodes.length > 0) {
      setCurrentEpisode(episodes[0].episodes[0])
    }
  }

  const handleSelectEpisode = (ep) => {
    setCurrentEpisode(ep)
    // Scroll lên player
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Format số views
  const formatViews = (n) => {
    if (!n) return '0'
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return n.toString()
  }

  // ===== LOADING =====
  if (loading) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-muted tracking-editorial text-xs mt-4">ĐANG TẢI PHIM...</p>
          </div>
        </div>
      </div>
    )
  }

  // ===== ERROR =====
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-32 border border-line">
            <span className="text-editorial-num text-8xl text-danger/20 block mb-4">!</span>
            <p className="text-danger tracking-editorial text-sm mb-4">
              {error || 'Không tìm thấy phim'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="border border-line px-6 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* ============ HERO BACKGROUND ============ */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.thumbUrl})` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/70 to-bg/40" />
          <div className="absolute inset-0 bg-linear-to-r from-bg/90 via-bg/60 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
          <div className="grid grid-cols-12 gap-6 w-full">
            {/* Poster */}
            <div className="hidden md:block col-span-3 lg:col-span-2">
              <div className="aspect-2/3 overflow-hidden border-2 border-line-gold shadow-2xl">
                <img
                  src={movie.posterUrl}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              {/* Back button */}
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-2 text-muted hover:text-gold transition-colors mb-4 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[11px] tracking-editorial">QUAY LẠI</span>
              </button>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-cream leading-tight mb-3">
                {movie.name}
              </h1>

              {movie.originName && movie.originName !== movie.name && (
                <p className="text-muted text-base md:text-lg italic mb-4">{movie.originName}</p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4">
                {movie.year && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold" />
                    {movie.year}
                  </span>
                )}
                {movie.time && (
                  <>
                    <span className="w-px h-4 bg-line" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gold" />
                      {movie.time}
                    </span>
                  </>
                )}
                {movie.tmdb?.vote_average > 0 && (
                  <>
                    <span className="w-px h-4 bg-line" />
                    <span className="flex items-center gap-1.5 text-gold">
                      <Star className="w-4 h-4 fill-gold" />
                      <span className="text-cream font-semibold">
                        {parseFloat(movie.tmdb.vote_average).toFixed(1)}
                      </span>
                    </span>
                  </>
                )}
                {movie.view > 0 && (
                  <>
                    <span className="w-px h-4 bg-line" />
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-gold" />
                      {formatViews(movie.view)} lượt xem
                    </span>
                  </>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                {movie.quality && (
                  <span className="px-3 py-1 border border-line-gold text-[10px] tracking-editorial text-gold font-bold">
                    {movie.quality}
                  </span>
                )}
                {movie.lang && (
                  <span className="px-3 py-1 border border-line text-[10px] tracking-editorial text-muted">
                    {movie.lang}
                  </span>
                )}
                <span
                  className={`px-3 py-1 text-[10px] tracking-editorial font-bold border ${
                    movie.status === 'ongoing'
                      ? 'border-gold text-gold'
                      : movie.status === 'completed'
                        ? 'border-green-500 text-green-500'
                        : 'border-line text-muted'
                  }`}
                >
                  {movie.statusLabel}
                </span>
                {movie.chieurap && (
                  <span className="px-3 py-1 border border-danger text-[10px] tracking-editorial text-danger font-bold">
                    CHIẾU RẠP
                  </span>
                )}
                {movie.subDocquyen && (
                  <span className="px-3 py-1 border border-line text-[10px] tracking-editorial text-muted">
                    PHỤ ĐỀ ĐỘC QUYỀN
                  </span>
                )}
              </div>

              {/* Episode progress */}
              {movie.episodeCurrent && (
                <p className="text-gold text-sm mb-4">
                  <span className="tracking-editorial text-xs">TIẾN ĐỘ: </span>
                  <span className="font-bold">{movie.episodeCurrent}</span>
                  {movie.episodeTotal && (
                    <span className="text-muted"> / {movie.episodeTotal}</span>
                  )}
                </p>
              )}

              {/* Categories */}
              {movie.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/genres/${cat.slug}`}
                      className="px-3 py-1 border border-line hover:border-gold text-xs tracking-editorial text-muted hover:text-gold transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Countries */}
              {movie.countries?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.countries.map((c) => (
                    <Link
                      key={c.id}
                      to={`/quoc-gia/${c.slug}`}
                      className="flex items-center gap-1 px-3 py-1 border border-line hover:border-gold text-xs tracking-editorial text-muted hover:text-gold transition-colors"
                    >
                      <Globe className="w-3 h-3" />
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {currentEpisode && (
                  <button
                    onClick={() => {
                      const el = document.getElementById('player-section')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group flex items-center gap-2 bg-gold hover:bg-gold-soft text-inverse px-6 py-3 font-bold tracking-editorial text-xs transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-inverse" />
                    XEM NGAY
                  </button>
                )}
                <button className="group flex items-center gap-2 border border-line hover:border-gold text-cream hover:text-gold px-6 py-3 font-bold tracking-editorial text-xs transition-all cursor-pointer">
                  <Heart className="w-4 h-4" />
                  YÊU THÍCH
                </button>
                <button className="group flex items-center gap-2 border border-line hover:border-gold text-cream hover:text-gold px-6 py-3 font-bold tracking-editorial text-xs transition-all cursor-pointer">
                  <Share2 className="w-4 h-4" />
                  CHIA SẺ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* ===== LEFT: Player + Episodes + Description ===== */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Player */}
            <section id="player-section">
              <div className="flex items-center gap-3 mb-4">
                <span className="tracking-editorial text-xs text-gold">— Đang xem</span>
                <span className="flex-1 h-px bg-line" />
                {currentEpisode && (
                  <span className="text-[11px] tracking-editorial text-muted">
                    TẬP {currentEpisode.name}
                  </span>
                )}
              </div>

              <VideoPlayer
                linkEmbed={currentEpisode?.linkEmbed}
                title={`${movie.name} - Tập ${currentEpisode?.name || '?'}`}
              />
            </section>

            {/* Episodes */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="tracking-editorial text-xs text-gold">— Danh sách tập</span>
                <span className="flex-1 h-px bg-line" />
                {movie.episodeTotal && (
                  <span className="text-[11px] tracking-editorial text-muted">
                    {movie.episodeTotal} TẬP
                  </span>
                )}
              </div>

              <EpisodeList
                servers={episodes}
                currentEpisodeSlug={currentEpisode?.slug}
                onSelectEpisode={handleSelectEpisode}
              />
            </section>

            {/* Description */}
            {movie.content && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="tracking-editorial text-xs text-gold">— Nội dung phim</span>
                  <span className="flex-1 h-px bg-line" />
                </div>

                <div className="border border-line p-6">
                  <p className="text-muted text-sm leading-relaxed whitespace-pre-line">
                    {movie.content}
                  </p>
                </div>
              </section>
            )}

            {/* Showtimes notify */}
            {movie.showtimes && (
              <div className="border border-line-gold bg-gold/5 p-4">
                <span className="tracking-editorial text-[10px] text-gold block mb-1">
                  — LỊCH CHIẾU
                </span>
                <p className="text-cream text-sm">{movie.showtimes}</p>
              </div>
            )}

            {/* Actors */}
            {movie.actors?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="tracking-editorial text-xs text-gold">— Diễn viên</span>
                  <span className="flex-1 h-px bg-line" />
                  <span className="text-[11px] tracking-editorial text-muted">
                    {movie.actors.length} người
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.actors.map((actor) => (
                    <span
                      key={actor}
                      className="flex items-center gap-2 px-3 py-2 border border-line text-sm text-cream hover:border-gold transition-colors"
                    >
                      <Users className="w-3 h-3 text-gold" />
                      {actor}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ===== RIGHT: Sidebar info ===== */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Movie info card */}
            <div className="border border-line p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="tracking-editorial text-xs text-gold">— Thông tin</span>
                <span className="flex-1 h-px bg-line" />
              </div>

              <dl className="space-y-3 text-sm">
                {movie.directors?.length > 0 && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      ĐẠO DIỄN
                    </dt>
                    <dd className="text-cream flex-1">{movie.directors.join(', ')}</dd>
                  </div>
                )}

                {movie.quality && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      CHẤT LƯỢNG
                    </dt>
                    <dd className="text-cream flex-1">{movie.quality}</dd>
                  </div>
                )}

                {movie.lang && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      NGÔN NGỮ
                    </dt>
                    <dd className="text-cream flex-1">{movie.lang}</dd>
                  </div>
                )}

                {movie.episodeTotal && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      SỐ TẬP
                    </dt>
                    <dd className="text-cream flex-1">{movie.episodeTotal}</dd>
                  </div>
                )}

                {movie.time && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      THỜI LƯỢNG
                    </dt>
                    <dd className="text-cream flex-1">{movie.time}</dd>
                  </div>
                )}

                {movie.year && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      NĂM
                    </dt>
                    <dd className="text-cream flex-1">{movie.year}</dd>
                  </div>
                )}

                {movie.tmdb?.vote_average > 0 && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      ĐIỂM TMDB
                    </dt>
                    <dd className="text-gold flex-1 font-bold">
                      {parseFloat(movie.tmdb.vote_average).toFixed(1)}/10
                      {movie.tmdb.vote_count > 0 && (
                        <span className="text-muted font-normal text-xs ml-2">
                          ({movie.tmdb.vote_count} vote)
                        </span>
                      )}
                    </dd>
                  </div>
                )}

                {movie.imdb?.id && (
                  <div className="flex gap-3">
                    <dt className="text-muted tracking-editorial text-[10px] w-24 shrink-0 pt-1">
                      IMDB
                    </dt>
                    <dd className="flex-1">
                      <a
                        href={`https://www.imdb.com/title/${movie.imdb.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold hover:underline text-xs"
                      >
                        {movie.imdb.id} ↗
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Keywords */}
            {movie.keywords?.length > 0 && (
              <div className="border border-line p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="tracking-editorial text-xs text-gold">— Từ khóa</span>
                  <span className="flex-1 h-px bg-line" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2 py-1 text-[10px] tracking-editorial text-muted bg-surface border border-line"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

/**
 * Outer — dùng key để reset state khi slug đổi
 */
const MovieDetail = () => {
  const { slug } = useParams()

  return <MovieDetailContent key={slug} slug={slug} />
}

export default MovieDetail
