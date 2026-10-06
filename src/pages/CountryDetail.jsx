// src/pages/CountryDetail.jsx
import {
  ArrowLeft,
  Calendar,
  Clock,
  Filter,
  Globe,
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
import YearFilter from '../components/YearFilter'
import useCountries from '../hooks/useCountries'
import useMoviesByCountry from '../hooks/useMoviesByCountry'
import useYears from '../hooks/useYears'

const MOVIE_TYPES = [
  { value: '', label: 'Tất cả' },
  { value: 'series', label: 'Phim bộ' },
  { value: 'single', label: 'Phim lẻ' },
  { value: 'hoathinh', label: 'Hoạt hình' },
  { value: 'tvshows', label: 'TV Shows' },
]

const STATUS_OPTIONS = [
  { value: '', label: 'Tất cả' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'ongoing', label: 'Đang chiếu' },
]

/**
 * Inner component — nhận countrySlug qua prop
 * Dùng key ở outer để reset state khi slug đổi
 */
const CountryDetailContent = ({ countrySlug }) => {
  const navigate = useNavigate()

  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Data hooks
  const { countries } = useCountries()
  const { years, loading: yearsLoading } = useYears()

  const countryInfo = useMemo(
    () => countries.find((c) => c.slug === countrySlug),
    [countries, countrySlug]
  )

  // Fetch phim theo quốc gia
  const { movies, pagination, loading, error } = useMoviesByCountry({
    slug: countrySlug,
    year: selectedYear === 'all' ? '' : selectedYear,
    type: selectedType,
    status: selectedStatus,
    page: currentPage,
    limit: 24,
  })

  // Filter client-side cho search
  const filteredMovies = useMemo(() => {
    if (!searchTerm) return movies
    return movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [movies, searchTerm])

  // Handlers
  const handleYearChange = (year) => {
    setSelectedYear(year)
    setCurrentPage(1)
    setSearchTerm('')
  }

  const handleTypeChange = (type) => {
    setSelectedType(type)
    setCurrentPage(1)
    setSearchTerm('')
  }

  const handleStatusChange = (status) => {
    setSelectedStatus(status)
    setCurrentPage(1)
    setSearchTerm('')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSearchTerm('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearAllFilters = () => {
    setSelectedYear('all')
    setSelectedType('')
    setSelectedStatus('')
    setCurrentPage(1)
    setSearchTerm('')
  }

  const displayName = countryInfo?.name || countrySlug.replace(/-/g, ' ')

  // Đếm số filter đang active
  const activeFiltersCount = [
    selectedYear !== 'all',
    selectedType !== '',
    selectedStatus !== '',
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        {/* ============ BACK BUTTON ============ */}
        <button
          onClick={() => navigate('/quoc-gia')}
          className="group flex items-center gap-2 text-muted hover:text-gold transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] tracking-editorial">QUAY LẠI QUỐC GIA</span>
        </button>

        {/* ============ HEADER ============ */}
        <div className="grid grid-cols-12 gap-6 items-end mb-12 border-b border-line pb-8">
          <div className="col-span-12 md:col-span-2">
            <Globe className="w-16 h-16 md:w-20 md:h-20 text-gold" />
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="tracking-editorial text-xs text-gold block mb-2">
              — Khám phá quốc gia
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-cream leading-none">
              {displayName}
            </h1>
            <p className="text-muted mt-4 text-sm leading-relaxed">
              {pagination ? (
                <>
                  Tổng cộng{' '}
                  <span className="text-gold font-bold">
                    {pagination.totalItems.toLocaleString('vi-VN')}
                  </span>{' '}
                  phim từ {displayName}
                </>
              ) : (
                <>Đang tải thông tin...</>
              )}
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <div className="flex items-center border border-line focus-within:border-gold bg-surface/40 transition-colors w-full md:w-auto">
              <Search className="w-4 h-4 text-muted ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Tìm trong quốc gia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-cream px-3 py-2.5 text-sm w-full md:w-56 placeholder:text-muted"
              />
            </div>
          </div>
        </div>

        {/* ============ FILTERS ============ */}
        <div className="space-y-4 mb-8">
          {/* Year */}
          <YearFilter
            years={years}
            activeYear={selectedYear}
            onChange={handleYearChange}
            isLoading={yearsLoading}
          />

          {/* Type */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] tracking-editorial text-gold shrink-0 w-16">
              Loại phim
            </span>
            <div className="flex flex-wrap gap-px bg-line border border-line">
              {MOVIE_TYPES.map((type) => {
                const isActive = selectedType === type.value
                return (
                  <button
                    key={type.value || 'all'}
                    onClick={() => handleTypeChange(type.value)}
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

          {/* Status */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] tracking-editorial text-gold shrink-0 w-16">
              Trạng thái
            </span>
            <div className="flex flex-wrap gap-px bg-line border border-line">
              {STATUS_OPTIONS.map((opt) => {
                const isActive = selectedStatus === opt.value
                return (
                  <button
                    key={opt.value || 'all'}
                    onClick={() => handleStatusChange(opt.value)}
                    className={`px-4 py-2 text-xs tracking-editorial transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gold text-inverse font-bold'
                        : 'bg-bg text-muted hover:text-cream hover:bg-surface'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Active filters summary */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-4 border-b border-line">
            <span className="text-[10px] tracking-editorial text-muted">Đang lọc:</span>
            {selectedYear !== 'all' && (
              <span className="text-[10px] tracking-editorial text-gold border border-line-gold px-2 py-1">
                NĂM {selectedYear}
              </span>
            )}
            {selectedType && (
              <span className="text-[10px] tracking-editorial text-gold border border-line-gold px-2 py-1">
                {MOVIE_TYPES.find((t) => t.value === selectedType)?.label.toUpperCase()}
              </span>
            )}
            {selectedStatus && (
              <span className="text-[10px] tracking-editorial text-gold border border-line-gold px-2 py-1">
                {STATUS_OPTIONS.find((s) => s.value === selectedStatus)?.label.toUpperCase()}
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-[10px] tracking-editorial text-muted hover:text-danger transition-colors cursor-pointer ml-auto"
            >
              ✕ XÓA TẤT CẢ
            </button>
          </div>
        )}

        {/* ============ VIEW TOGGLE + COUNT ============ */}
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

        {/* ============ LOADING ============ */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
            <p className="text-muted tracking-editorial text-xs mt-4">ĐANG TẢI PHIM...</p>
          </div>
        )}

        {/* ============ ERROR ============ */}
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

        {/* ============ GRID VIEW ============ */}
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
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
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

        {/* ============ LIST VIEW ============ */}
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
                    {movie.isSeries && movie.seasonNumber && (
                      <>
                        <span className="w-px h-3 bg-line" />
                        <span>SEASON {movie.seasonNumber}</span>
                      </>
                    )}
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

        {/* ============ EMPTY ============ */}
        {!loading && !error && filteredMovies.length === 0 && (
          <div className="text-center py-24 border border-line">
            <span className="text-editorial-num text-8xl text-gold/20 block mb-4">∅</span>
            <p className="text-muted tracking-editorial text-sm">
              {searchTerm
                ? 'Không tìm thấy phim nào phù hợp'
                : activeFiltersCount > 0
                  ? 'Không có phim nào phù hợp với bộ lọc'
                  : 'Không có phim nào từ quốc gia này'}
            </p>
            {(searchTerm || activeFiltersCount > 0) && (
              <button
                onClick={clearAllFilters}
                className="mt-4 border border-line px-6 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}

        {/* ============ PAGINATION ============ */}
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

/**
 * Outer — dùng key để reset state khi countrySlug đổi
 */
const CountryDetail = () => {
  const { countrySlug } = useParams()

  return <CountryDetailContent key={countrySlug} countrySlug={countrySlug} />
}

export default CountryDetail
