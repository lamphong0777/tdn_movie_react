import { Search } from 'lucide-react'
import { useState } from 'react'

export const DesktopSearchBar = () => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!keyword.trim()) return
    console.log('Search:', keyword)
    // TODO: Navigate to search page
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden lg:flex items-center border border-line hover:border-line-gold transition-colors bg-surface/40 focus-within:border-gold focus-within:bg-surface"
    >
      <Search className="w-4 h-4 text-muted ml-3 shrink-0" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Tìm phim..."
        className="bg-transparent border-none outline-none text-cream px-3 py-2.5 w-44 focus:w-64 transition-all text-sm placeholder:text-muted"
      />
    </form>
  )
}

// Mobile search bar - expandable
export const MobileSearchBar = () => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!keyword.trim()) return
    console.log('Search:', keyword)
    // TODO: Navigate to search page
  }

  return (
    <div className="lg:hidden py-3 border-t border-line">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border border-line focus-within:border-gold bg-surface/40"
      >
        <Search className="w-4 h-4 text-muted ml-3 shrink-0" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm phim..."
          autoFocus
          className="bg-transparent border-none outline-none text-cream px-3 py-2.5 w-full text-sm placeholder:text-muted"
        />
      </form>
    </div>
  )
}
