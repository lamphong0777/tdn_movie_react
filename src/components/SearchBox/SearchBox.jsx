import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import useSearchMovies from '../../hooks/useSearchMovies'
import SearchDropdown from '../SearchDropdown'

const SearchBox = ({ variant = 'desktop', placeholder = 'Tìm phim...' }) => {
  const [keyword, setKeyword] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const wrapperRef = useRef(null)

  const { movies, pagination, loading, error } = useSearchMovies(keyword, 400, 8)

  const isOpen = isFocused && keyword.trim().length > 0

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e) => {
    setKeyword(e.target.value)
    if (!e.target.value.trim()) setIsFocused(false)
  }

  const handleClear = () => {
    setKeyword('')
    setIsFocused(false)
  }

  const handleSelect = () => {
    setKeyword('')
    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const inputClasses = variant === 'desktop' ? 'w-44 focus:w-64' : 'w-full'

  return (
    <div ref={wrapperRef} className="relative w-full">
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
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`bg-transparent border-none outline-none text-cream px-3 py-2.5 text-sm placeholder:text-muted transition-all ${inputClasses}`}
        />

        {keyword && (
          <button
            onClick={handleClear}
            aria-label="Xóa"
            className="p-2 text-muted hover:text-gold transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <SearchDropdown
        keyword={keyword}
        movies={movies}
        pagination={pagination}
        loading={loading}
        error={error}
        isOpen={isOpen}
        onClose={() => setIsFocused(false)}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default SearchBox
