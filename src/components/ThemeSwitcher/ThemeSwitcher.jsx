import { Check, Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeSwitcher = () => {
  const { theme, setLightTheme, setDarkTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Đóng khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const options = [
    { id: 'light', label: 'Sáng', icon: Sun, action: setLightTheme },
    { id: 'dark', label: 'Tối', icon: Moon, action: setDarkTheme },
  ]

  const CurrentIcon = theme === 'dark' ? Moon : Sun

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted hover:text-gold transition-colors"
        aria-label="Chọn chế độ hiển thị"
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-surface border border-line shadow-xl z-50 animate-fade-in">
          <div className="py-1">
            {options.map((option) => {
              const Icon = option.icon
              const isActive = theme === option.id

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    option.action()
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    isActive ? 'text-gold bg-surface-2' : 'text-text hover:bg-surface-2'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </span>
                  {isActive && <Check className="w-4 h-4 text-gold" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher
