// src/components/SearchDropdown/SearchDropdown.jsx
import { ArrowUpRight, Loader2, Play, Search, Star, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchDropdown = ({
  keyword,
  movies = [],
  pagination = null,
  loading = false,
  error = null,
  isOpen = false,
  onClose,
  onSelect,
}) => {
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Đóng khi click ngoài
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  // Đóng khi nhấn Escape
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleMovieClick = (movie) => {
    onSelect?.(movie)
    onClose?.()
    navigate(`/phim/${movie.slug}`)
  }

  const handleViewAll = () => {
    onClose?.()
    navigate(`/tim-kiem?keyword=${encodeURIComponent(keyword)}`)
  }

  const hasResults = movies.length > 0

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-px z-50 bg-surface border border-line shadow-2xl animate-fade-in max-h-[520px] overflow-hidden flex flex-col"
    >
      {/* ===== Loading ===== */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 text-gold animate-spin" />
          <span className="ml-3 text-[11px] tracking-editorial text-muted">ĐANG TÌM KIẾM...</span>
        </div>
      )}

      {/* ===== Error ===== */}
      {!loading && error && (
        <div className="p-6 text-center">
          <p className="text-danger text-xs tracking-editorial">{error}</p>
        </div>
      )}

      {/* ===== Empty ===== */}
      {!loading && !error && !hasResults && keyword.trim() && (
        <div className="p-8 text-center">
          <Search className="w-8 h-8 text-line mx-auto mb-3" />
          <p className="text-muted text-xs tracking-editorial">KHÔNG TÌM THẤY KẾT QUẢ NÀO</p>
          <p className="text-muted/70 text-[11px] mt-2">Thử từ khóa khác hoặc kiểm tra chính tả</p>
        </div>
      )}

      {/* ===== Results ===== */}
      {!loading && !error && hasResults && (
        <>
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-line bg-surface-2 flex items-center justify-between sticky top-0 z-10">
            <span className="tracking-editorial text-[10px] text-gold">— KẾT QUẢ TÌM KIẾM</span>
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="text-muted hover:text-gold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1">
            {movies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleMovieClick(movie)}
                className="group w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors cursor-pointer text-left border-b border-line last:border-b-0"
              >
                {/* Poster mini */}
                <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden border border-line group-hover:border-line-gold transition-colors">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-4 h-4 text-gold fill-gold" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-cream text-sm font-semibold truncate group-hover:text-gold transition-colors">
                    {movie.title}
                  </h4>

                  {movie.originName && movie.originName !== movie.title && (
                    <p className="text-muted text-[11px] italic truncate mt-0.5">
                      {movie.originName}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 text-[10px] tracking-editorial text-muted mt-1.5">
                    <span>{movie.year}</span>

                    {movie.rating > 0 && (
                      <>
                        <span className="w-px h-2.5 bg-line" />
                        <span className="flex items-center gap-1 text-gold">
                          <Star className="w-2.5 h-2.5 fill-gold" />
                          {movie.rating.toFixed(1)}
                        </span>
                      </>
                    )}

                    <span className="w-px h-2.5 bg-line" />
                    <span>{movie.isSeries ? 'PHIM BỘ' : 'PHIM LẺ'}</span>

                    {movie.isSeries && movie.seasonNumber && (
                      <>
                        <span className="w-px h-2.5 bg-line" />
                        <span className="text-gold">S{movie.seasonNumber}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-gold opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* View all */}
          {pagination && pagination.totalItems > movies.length && (
            <button onClick={handleViewAll} className="...">
              XEM TẤT CẢ {pagination.totalItems.toLocaleString('vi-VN')} KẾT QUẢ
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default SearchDropdown
