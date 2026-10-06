// src/components/SearchBox/SearchBox.jsx
import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import useSearchMovies from '../../hooks/useSearchMovies'
import SearchDropdown from '../SearchDropdown'

const SearchBox = ({ variant = 'desktop', placeholder = 'Tìm phim...' }) => {
  const [keyword, setKeyword] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  // ✅ Destructure pagination từ hook
  const { movies, pagination, loading, error } = useSearchMovies(keyword, 400, 8)

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mở dropdown khi có keyword
  useEffect(() => {
    if (keyword.trim()) setIsOpen(true)
    else setIsOpen(false)
  }, [keyword])

  const inputClasses = variant === 'desktop' ? 'w-44 focus:w-64' : 'w-full'

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input */}
      <div
        className={`flex items-center border transition-colors ${
          isOpen
            ? 'border-gold bg-surface'
            : 'border-line hover:border-line-gold bg-surface/40 focus-within:border-gold focus-within:bg-surface'
        }`}
      >
        <Search className="w-4 h-4 text-muted ml-3 shrink-0" />

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => keyword.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className={`bg-transparent border-none outline-none text-cream px-3 py-2.5 text-sm placeholder:text-muted transition-all ${inputClasses}`}
        />

        {/* Clear button */}
        {keyword && (
          <button
            onClick={() => {
              setKeyword('')
              setIsOpen(false)
            }}
            aria-label="Xóa"
            className="p-2 text-muted hover:text-gold transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ✅ Truyền pagination xuống dropdown */}
      <SearchDropdown
        keyword={keyword}
        movies={movies}
        pagination={pagination}
        loading={loading}
        error={error}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={() => setKeyword('')}
      />
    </div>
  )
}

export default SearchBox
