// src/components/GenreFilter/GenreFilter.jsx
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getGenreIcon } from '../../utils/genreIcons'

// Số lượng thể loại hiển thị trực tiếp (không tính "Tất cả")
const VISIBLE_COUNT = 5

const GenreFilter = ({ genres = [], activeSlug, onChange, isLoading = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Đóng dropdown khi nhấn Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // ===== Loading skeleton =====
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-0 mb-10 border border-line w-fit">
        {[...Array(VISIBLE_COUNT + 1)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-3 border-r border-line last:border-r-0"
          >
            <div className="w-4 h-4 bg-surface-2 animate-pulse" />
            <div className="w-16 h-3 bg-surface-2 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (genres.length === 0) return null

  // ===== Phân tách: "Tất cả" + 5 đầu + phần còn lại =====
  const allGenre = genres.find((g) => g.slug === 'all')
  const otherGenres = genres.filter((g) => g.slug !== 'all')

  const visibleGenres = otherGenres.slice(0, VISIBLE_COUNT)
  const hiddenGenres = otherGenres.slice(VISIBLE_COUNT)

  // Kiểm tra xem genre đang active có nằm trong hidden không
  const isActiveHidden = hiddenGenres.some((g) => g.slug === activeSlug)
  const activeGenre = genres.find((g) => g.slug === activeSlug)

  const handleSelect = (slug) => {
    onChange(slug)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-wrap items-stretch gap-0 mb-10 border border-line w-fit">
      {/* ===== Nút "Tất cả" ===== */}
      {allGenre && (
        <button
          onClick={() => handleSelect('all')}
          className={`flex items-center gap-2 px-5 py-3 text-sm tracking-editorial transition-all cursor-pointer border-r border-line ${
            activeSlug === 'all'
              ? 'bg-gold text-inverse font-semibold'
              : 'bg-transparent text-muted hover:text-cream hover:bg-surface'
          }`}
        >
          {getGenreIcon('all')}
          {allGenre.name}
        </button>
      )}

      {/* ===== 5 thể loại hiển thị ===== */}
      {visibleGenres.map((genre) => {
        const isActive = activeSlug === genre.slug
        return (
          <button
            key={genre._id}
            onClick={() => handleSelect(genre.slug)}
            className={`flex items-center gap-2 px-5 py-3 text-sm tracking-editorial transition-all cursor-pointer border-r border-line ${
              isActive
                ? 'bg-gold text-inverse font-semibold'
                : 'bg-transparent text-muted hover:text-cream hover:bg-surface'
            }`}
          >
            {getGenreIcon(genre.slug)}
            {genre.name}
          </button>
        )
      })}

      {/* ===== Dropdown "Xem thêm" ===== */}
      {hiddenGenres.length > 0 && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className={`flex items-center gap-2 px-5 py-3 text-sm tracking-editorial transition-all cursor-pointer h-full ${
              isActiveHidden
                ? 'bg-gold text-inverse font-semibold'
                : isOpen
                  ? 'bg-surface text-cream'
                  : 'bg-transparent text-muted hover:text-cream hover:bg-surface'
            }`}
          >
            {isActiveHidden ? (
              <>
                {getGenreIcon(activeSlug)}
                {activeGenre?.name}
              </>
            ) : (
              <>
                Xem thêm
                <span className="text-[10px] opacity-60">({hiddenGenres.length})</span>
              </>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* ===== Dropdown panel ===== */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-px z-50 bg-surface border border-line shadow-2xl min-w-[280px] max-h-[400px] overflow-y-auto animate-fade-in">
              {/* Header */}
              <div className="px-4 py-3 border-b border-line bg-surface-2 sticky top-0">
                <span className="tracking-editorial text-[10px] text-gold">— TẤT CẢ THỂ LOẠI</span>
              </div>

              {/* List */}
              <div className="py-1">
                {hiddenGenres.map((genre) => {
                  const isActive = activeSlug === genre.slug
                  return (
                    <button
                      key={genre._id}
                      onClick={() => handleSelect(genre.slug)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'text-gold bg-surface-2'
                          : 'text-muted hover:text-cream hover:bg-surface-2'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {getGenreIcon(genre.slug)}
                        {genre.name}
                      </span>
                      {isActive && <Check className="w-4 h-4 text-gold" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GenreFilter
