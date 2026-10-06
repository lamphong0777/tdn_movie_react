// src/pages/GenreDetail.jsx
import {
  ArrowLeft,
  Calendar,
  Clock,
  Filter,
  Grid3x3,
  Heart,
  List,
  Loader2,
  Play,
  Search,
  Star,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import useGenres from '../hooks/useGenres'
import useMoviesByGenre from '../hooks/useMoviesByGenre'
import { getGenreIcon } from '../utils/genreIcons'

const MOVIE_TYPES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'series', label: 'Phim bộ' },
  { value: 'single', label: 'Phim lẻ' },
  { value: 'hoathinh', label: 'Hoạt hình' },
  { value: 'tvshows', label: 'TV Shows' },
]

/**
 * ✅ Inner component — nhận genreSlug qua prop
 * Khi genreSlug thay đổi, React sẽ remount → state tự reset
 */
const GenreDetailContent = ({ genreSlug }) => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const { genres } = useGenres()
  const genreInfo = useMemo(() => genres.find((g) => g.slug === genreSlug), [genres, genreSlug])

  const { movies, pagination, loading, error } = useMoviesByGenre(genreSlug, currentPage, 24)

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (selectedType !== 'all') {
        const isSeries = movie.type === 'tv'
        const isSingle = movie.type === 'movie'
        if (selectedType === 'series' && !isSeries) return false
        if (selectedType === 'single' && !isSingle) return false
      }
      if (searchTerm) {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return true
    })
  }, [movies, selectedType, searchTerm])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSearchTerm('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const displayName = genreInfo?.name || genreSlug.replace(/-/g, ' ')

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate('/genres')}
          className="group flex items-center gap-2 text-muted hover:text-gold transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] tracking-editorial">QUAY LẠI THỂ LOẠI</span>
        </button>

        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end mb-12 border-b border-line pb-8">
          <div className="col-span-12 md:col-span-2">
            <div className="text-gold [&>svg]:w-16 [&>svg]:h-16">{getGenreIcon(genreSlug)}</div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="tracking-editorial text-xs text-gold block mb-2">
              — Khám phá thể loại
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-cream leading-none capitalize">
              {displayName}
            </h1>
            <p className="text-muted mt-4 text-sm leading-relaxed">
              {pagination ? (
                <>
                  Tổng cộng{' '}
                  <span className="text-gold font-bold">
                    {pagination.totalItems.toLocaleString('vi-VN')}
                  </span>{' '}
                  phim thuộc thể loại này
                </>
              ) : (
                <>Đang tải thông tin thể loại...</>
              )}
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <div className="flex items-center border border-line focus-within:border-gold bg-surface/40 transition-colors w-full md:w-auto">
              <Search className="w-4 h-4 text-muted ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Tìm trong thể loại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-cream px-3 py-2.5 text-sm w-full md:w-56 placeholder:text-muted"
              />
            </div>
          </div>
        </div>

        {/* Type filter */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-[10px] tracking-editorial text-gold shrink-0 w-16">Loại phim</span>
          <div className="flex flex-wrap gap-px bg-line border border-line">
            {MOVIE_TYPES.map((type) => {
              const isActive = selectedType === type.value
              return (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 text-xs tracking-editorial transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gold text-inverse font-bold'
                      : 'bg-bg text-muted hover:text-cream hover:bg-surface'
                  }`}
                >
                  {type.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* View toggle + count */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-line">
          <span className="text-[11px] tracking-editorial text-muted">
            {loading ? (
              'Đang tải...'
            ) : (
              <>
                Hiển thị <span className="text-gold font-bold">{filteredMovies.length}</span> phim
                {pagination && (
                  <span className="ml-2 opacity-60">
                    / trang {pagination.currentPage} của {pagination.totalPages}
                  </span>
                )}
              </>
            )}
          </span>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 border border-line hover:border-gold text-muted hover:text-gold px-3 py-2 text-[11px] tracking-editorial transition-colors cursor-pointer">
              <Filter className="w-3 h-3" />
              Lọc nâng cao
            </button>

            <div className="flex border border-line">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Xem dạng lưới"
                className={`p-2 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-gold text-inverse' : 'bg-bg text-muted hover:text-cream'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="Xem dạng danh sách"
                className={`p-2 transition-colors cursor-pointer border-l border-line ${
                  viewMode === 'list' ? 'bg-gold text-inverse' : 'bg-bg text-muted hover:text-cream'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
            <p className="text-muted tracking-editorial text-xs mt-4">ĐANG TẢI PHIM...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32 border border-line">
            <span className="text-editorial-num text-8xl text-danger/20 block mb-4">!</span>
            <p className="text-danger tracking-editorial text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="border border-line px-6 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Grid view */}
        {!loading && !error && viewMode === 'grid' && filteredMovies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px bg-line mb-12">
            {filteredMovies.map((movie, idx) => (
              <Link
                to={`/phim/${movie.slug}`}
                key={movie.id}
                className="group relative bg-bg cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-2/3 overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-transparent opacity-90" />
                  <span className="absolute top-3 left-3 text-editorial-num text-4xl text-cream/30 group-hover:text-gold transition-colors select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                    {movie.isNew && (
                      <span className="bg-gold text-inverse text-[10px] tracking-editorial px-2 py-1 font-bold">
                        MỚI
                      </span>
                    )}
                    {movie.isHot && (
                      <span className="bg-cream text-inverse text-[10px] tracking-editorial px-2 py-1 font-bold">
                        HOT
                      </span>
                    )}
                  </div>

                  {movie.isSeries && movie.seasonNumber && (
                    <div className="absolute bottom-3 right-3 bg-bg/80 backdrop-blur-sm border border-line-gold px-2 py-1">
                      <span className="text-[10px] tracking-editorial text-gold font-bold">
                        S{movie.seasonNumber}
                      </span>
                    </div>
                  )}

                  {movie.rating > 0 && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 border border-line-gold bg-bg/80 backdrop-blur-sm px-2 py-1">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span className="text-cream text-xs font-semibold">
                        {movie.rating.toFixed(1)}
                      </span>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // TODO: Xử lý yêu thích (VD: toggle localStorage, gọi API)
                        console.log('Yêu thích:', movie.slug)
                      }}
                      aria-label="Yêu thích"
                      className="bg-bg/80 backdrop-blur-sm border border-line p-3 hover:border-gold hover:text-gold text-cream transition-colors cursor-pointer"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 border-t border-line group-hover:border-line-gold transition-colors">
                  <h3
                    className="text-cream font-semibold text-sm truncate group-hover:text-gold transition-colors"
                    title={movie.title}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] tracking-editorial text-muted mt-1.5">
                    <span>{movie.year}</span>
                    <span>{movie.isSeries ? 'PHIM BỘ' : 'PHIM LẺ'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* List view */}
        {!loading && !error && viewMode === 'list' && filteredMovies.length > 0 && (
          <div className="divide-y divide-line border-y border-line mb-12">
            {filteredMovies.map((movie, idx) => (
              <article
                key={movie.id}
                className="group grid grid-cols-12 gap-4 py-5 hover:bg-surface transition-colors cursor-pointer"
              >
                <div className="col-span-2 md:col-span-1 flex items-center justify-center">
                  <span className="text-editorial-num text-5xl md:text-6xl text-line group-hover:text-gold transition-colors select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="col-span-3 md:col-span-1">
                  <div className="aspect-2/3 overflow-hidden border border-line group-hover:border-line-gold transition-colors">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="col-span-7 md:col-span-8">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-cream text-lg md:text-2xl font-semibold group-hover:text-gold transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {movie.isNew && (
                        <span className="bg-gold text-inverse text-[10px] tracking-editorial px-2 py-0.5 font-bold">
                          MỚI
                        </span>
                      )}
                      {movie.isHot && (
                        <span className="bg-cream text-inverse text-[10px] tracking-editorial px-2 py-0.5 font-bold">
                          HOT
                        </span>
                      )}
                    </div>
                  </div>

                  {movie.originName && movie.originName !== movie.title && (
                    <p className="text-muted text-xs italic mb-2">{movie.originName}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-[11px] tracking-editorial text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold" />
                      {movie.year}
                    </span>
                    {movie.rating > 0 && (
                      <>
                        <span className="w-px h-3 bg-line" />
                        <span className="flex items-center gap-1 text-gold">
                          <Star className="w-3 h-3 fill-gold" />
                          {movie.rating.toFixed(1)}
                        </span>
                      </>
                    )}
                    <span className="w-px h-3 bg-line" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      {movie.isSeries ? 'PHIM BỘ' : 'PHIM LẺ'}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex col-span-2 justify-end items-start">
                  <button className="group/btn flex items-center gap-2 border border-line hover:border-gold hover:bg-gold hover:text-inverse text-muted px-4 py-2 text-[11px] tracking-editorial transition-all cursor-pointer">
                    <Play className="w-3 h-3" />
                    Xem ngay
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredMovies.length === 0 && (
          <div className="text-center py-24 border border-line">
            <span className="text-editorial-num text-8xl text-gold/20 block mb-4">∅</span>
            <p className="text-muted tracking-editorial text-sm">
              {searchTerm
                ? 'Không tìm thấy phim nào phù hợp'
                : 'Không có phim nào trong thể loại này'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 border border-line px-6 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination && pagination.totalPages > 1 && searchTerm === '' && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}

const GenreDetail = () => {
  const { genreSlug } = useParams()

  return <GenreDetailContent key={genreSlug} genreSlug={genreSlug} />
}

export default GenreDetail
