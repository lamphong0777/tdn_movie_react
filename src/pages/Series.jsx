import {
  ArrowUpRight,
  Calendar,
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
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import YearFilter from '../components/YearFilter'
import useSeriesList from '../hooks/useSeriesList'
import useYears from '../hooks/useYears'

const Series = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Danh sách năm từ API
  const { years, loading: yearsLoading } = useYears()

  // Fetch phim bộ với filter năm (server-side)
  const { movies, pagination, loading, error } = useSeriesList({
    year: selectedYear,
    page: currentPage,
    limit: 24,
    type: 'series',
  })

  // Search client-side (chỉ trong trang hiện tại)
  const filteredMovies = useMemo(() => {
    if (!searchTerm) return movies
    return movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [movies, searchTerm])

  // Khi đổi năm → reset về trang 1
  const handleYearChange = (year) => {
    setSelectedYear(year)
    setCurrentPage(1)
    setSearchTerm('')
  }

  // Khi đổi trang → clear search, giữ nguyên năm
  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        {/* ============ HEADER ============ */}
        <div className="grid grid-cols-12 gap-6 items-end mb-12 border-b border-line pb-8">
          <div className="col-span-12 md:col-span-2">
            <span className="text-editorial-num text-7xl md:text-8xl text-gold/20 select-none">
              05
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="tracking-editorial text-xs text-gold block mb-2">
              — Bộ phim dài kỳ
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-cream leading-none">
              Phim <span className="text-gold italic">bộ</span>
            </h1>
            <p className="text-muted mt-4 text-sm leading-relaxed">
              Khám phá các bộ phim truyền hình hấp dẫn nhất — từ series kinh điển đến bom tấn
              streaming mới nhất.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <div className="flex items-center border border-line focus-within:border-gold bg-surface/40 transition-colors w-full md:w-auto">
              <Search className="w-4 h-4 text-muted ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Tìm phim bộ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-cream px-3 py-2.5 text-sm w-full md:w-56 placeholder:text-muted"
              />
            </div>
          </div>
        </div>

        {/* ============ FILTERS ============ */}
        <div className="mb-8">
          <YearFilter
            years={years}
            activeYear={selectedYear}
            onChange={handleYearChange}
            isLoading={yearsLoading}
          />
        </div>

        {/* ============ VIEW TOGGLE + COUNT ============ */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-line">
          <span className="text-[11px] tracking-editorial text-muted">
            {loading ? (
              'Đang tải...'
            ) : (
              <>
                Tìm thấy <span className="text-gold font-bold">{filteredMovies.length}</span> phim
                {pagination && (
                  <span className="ml-2 opacity-60">
                    / trang {pagination.currentPage} của {pagination.totalPages}
                  </span>
                )}
                {selectedYear !== 'all' && (
                  <span className="ml-2 text-gold">— Năm {selectedYear}</span>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-line mb-12">
            {filteredMovies.map((serie, idx) => (
              <Link
                key={serie.id}
                to={`/phim/${serie.slug}`}
                className="group relative bg-bg cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-2/3 overflow-hidden">
                  <img
                    src={serie.image}
                    alt={serie.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-transparent opacity-90" />
                  <span className="absolute top-3 left-3 text-editorial-num text-4xl text-cream/30 group-hover:text-gold transition-colors select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                    {serie.isNew && (
                      <span className="bg-gold text-inverse text-[10px] tracking-editorial px-2 py-1 font-bold">
                        MỚI
                      </span>
                    )}
                    {serie.isHot && (
                      <span className="bg-cream text-inverse text-[10px] tracking-editorial px-2 py-1 font-bold">
                        HOT
                      </span>
                    )}
                  </div>

                  {serie.isSeries && serie.seasonNumber && (
                    <div className="absolute bottom-3 right-3 bg-bg/80 backdrop-blur-sm border border-line-gold px-2 py-1">
                      <span className="text-[10px] tracking-editorial text-gold font-bold">
                        S{serie.seasonNumber}
                      </span>
                    </div>
                  )}

                  {serie.rating > 0 && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 border border-line-gold bg-bg/80 backdrop-blur-sm px-2 py-1">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span className="text-cream text-xs font-semibold">
                        {serie.rating.toFixed(1)}
                      </span>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Nút Play — cũng nên chặn để tránh navigate 2 lần (nếu muốn xử lý riêng) */}
                    {/* <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // TODO: Xử lý play (VD: navigate với autoplay)
                        console.log('Play:', serie.slug)
                      }}
                      aria-label="Xem ngay"
                      className="bg-gold p-3 border-2 border-gold hover:bg-gold-soft transition-colors cursor-pointer"
                    >
                      <Play className="w-5 h-5 text-inverse fill-inverse" />
                    </button> */}

                    {/* ✅ Nút Tim — chặn event để không navigate */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // TODO: Xử lý yêu thích (VD: toggle localStorage, gọi API)
                        console.log('Yêu thích:', serie.slug)
                      }}
                      aria-label="Yêu thích"
                      className="bg-bg/80 backdrop-blur-sm border border-line p-3 hover:border-gold hover:text-gold text-cream transition-colors cursor-pointer"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 border-t border-line group-hover:border-line-gold transition-colors">
                  <h3 className="text-cream font-semibold text-sm truncate group-hover:text-gold transition-colors">
                    {serie.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] tracking-editorial text-muted mt-1.5">
                    <span>{serie.year}</span>
                    <span>PHIM BỘ</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ============ LIST VIEW ============ */}
        {!loading && !error && viewMode === 'list' && filteredMovies.length > 0 && (
          <div className="divide-y divide-line border-y border-line mb-12">
            {filteredMovies.map((serie, idx) => (
              <article
                key={serie.id}
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
                      src={serie.image}
                      alt={serie.title}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="col-span-7 md:col-span-8">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-cream text-lg md:text-2xl font-semibold group-hover:text-gold transition-colors">
                      {serie.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {serie.isNew && (
                        <span className="bg-gold text-inverse text-[10px] tracking-editorial px-2 py-0.5 font-bold">
                          MỚI
                        </span>
                      )}
                      {serie.isHot && (
                        <span className="bg-cream text-inverse text-[10px] tracking-editorial px-2 py-0.5 font-bold">
                          HOT
                        </span>
                      )}
                    </div>
                  </div>

                  {serie.originName && serie.originName !== serie.title && (
                    <p className="text-muted text-xs italic mb-2">{serie.originName}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-[11px] tracking-editorial text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold" />
                      {serie.year}
                    </span>
                    {serie.rating > 0 && (
                      <>
                        <span className="w-px h-3 bg-line" />
                        <span className="flex items-center gap-1 text-gold">
                          <Star className="w-3 h-3 fill-gold" />
                          {serie.rating.toFixed(1)}
                        </span>
                      </>
                    )}
                    {serie.isSeries && serie.seasonNumber && (
                      <>
                        <span className="w-px h-3 bg-line" />
                        <span>SEASON {serie.seasonNumber}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex col-span-2 justify-end items-start">
                  <button className="group/btn flex items-center gap-2 border border-line hover:border-gold hover:bg-gold hover:text-inverse text-muted px-4 py-2 text-[11px] tracking-editorial transition-all cursor-pointer">
                    <Play className="w-3 h-3" />
                    Xem ngay
                    <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ============ EMPTY ============ */}
        {!loading && !error && filteredMovies.length === 0 && movies.length > 0 && (
          <div className="text-center py-24 border border-line">
            <span className="text-editorial-num text-8xl text-gold/20 block mb-4">∅</span>
            <p className="text-muted tracking-editorial text-sm">Không tìm thấy phim nào phù hợp</p>
            <button
              onClick={() => {
                setSearchTerm('')
              }}
              className="mt-4 border border-line px-6 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all"
            >
              Xóa tìm kiếm
            </button>
          </div>
        )}

        {/* ============ EMPTY (không có data từ API) ============ */}
        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-24 border border-line">
            <span className="text-editorial-num text-8xl text-gold/20 block mb-4">∅</span>
            <p className="text-muted tracking-editorial text-sm">
              {selectedYear !== 'all'
                ? `Không có phim bộ nào trong năm ${selectedYear}`
                : 'Không có phim bộ nào'}
            </p>
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

export default Series
