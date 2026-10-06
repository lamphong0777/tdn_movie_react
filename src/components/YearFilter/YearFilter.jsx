// src/components/YearFilter/YearFilter.jsx
import { Calendar, Check, ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const YearFilter = ({ years = [], activeYear = 'all', onChange, isLoading = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const listRef = useRef(null)

  // Đóng dropdown khi click ngoài
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

  // Scroll đến năm đang active khi mở dropdown
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.querySelector('[data-active="true"]')
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'center', behavior: 'instant' })
      }
    }
  }, [isOpen])

  // Group năm theo thập kỷ
  const groupedYears = useMemo(() => {
    if (!years.length) return {}

    const groups = {}
    years.forEach((y) => {
      const decade = Math.floor(y.value / 10) * 10
      const key = `${decade}s`
      if (!groups[key]) groups[key] = []
      groups[key].push(y)
    })
    return groups
  }, [years])

  const activeYearLabel = useMemo(() => {
    if (activeYear === 'all') return 'Tất cả'
    return activeYear
  }, [activeYear])

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-editorial text-gold shrink-0 w-16">Năm</span>
        <div className="h-10 w-32 bg-surface-2 animate-pulse border border-line" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] tracking-editorial text-gold shrink-0 w-16">Năm</span>

      <div className="relative" ref={dropdownRef}>
        {/* Trigger button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className={`flex items-center gap-3 px-4 py-2 text-xs tracking-editorial transition-all cursor-pointer border min-w-[140px] justify-between ${
            isOpen
              ? 'border-gold bg-surface text-cream'
              : 'border-line bg-bg text-muted hover:border-gold hover:text-cream'
          }`}
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            {activeYearLabel}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div
            ref={listRef}
            className="absolute top-full left-0 mt-px z-50 bg-surface border border-line shadow-2xl w-[280px] max-h-[400px] overflow-y-auto animate-fade-in"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-line bg-surface-2 sticky top-0 z-10">
              <span className="tracking-editorial text-[10px] text-gold">— CHỌN NĂM</span>
            </div>

            {/* Tất cả */}
            <button
              onClick={() => {
                onChange('all')
                setIsOpen(false)
              }}
              data-active={activeYear === 'all'}
              className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer border-b border-line ${
                activeYear === 'all'
                  ? 'text-gold bg-surface-2'
                  : 'text-muted hover:text-cream hover:bg-surface-2'
              }`}
            >
              <span>Tất cả các năm</span>
              {activeYear === 'all' && <Check className="w-4 h-4 text-gold" />}
            </button>

            {/* Grouped by decade */}
            {Object.entries(groupedYears).map(([decade, decadeYears]) => (
              <div key={decade}>
                <div className="px-4 py-2 bg-surface-2/50 border-y border-line sticky top-[41px] z-10">
                  <span className="tracking-editorial text-[10px] text-muted">{decade}</span>
                </div>

                <div className="grid grid-cols-3 gap-px bg-line">
                  {decadeYears.map((year) => {
                    const isActive = activeYear === year.name
                    return (
                      <button
                        key={year._id}
                        onClick={() => {
                          onChange(year.name)
                          setIsOpen(false)
                        }}
                        data-active={isActive}
                        className={`px-3 py-2 text-xs tracking-editorial transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-gold text-inverse font-bold'
                            : 'bg-surface text-muted hover:text-cream hover:bg-surface-2'
                        }`}
                      >
                        {year.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default YearFilter
