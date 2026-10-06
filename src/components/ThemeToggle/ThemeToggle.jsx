import { Moon, Sun } from 'lucide-react'
import useTheme from '../../hooks/useTheme'

const ThemeToggle = ({ variant = 'default' }) => {
  const { isDark, toggleTheme } = useTheme()

  // Variant icon - chỉ hiển thị icon
  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className="relative p-2 text-muted hover:text-gold transition-colors duration-300"
        aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        <div className="relative w-5 h-5">
          <Sun
            className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
              isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
            }`}
          />
          <Moon
            className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
              isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
        </div>
      </button>
    )
  }

  // Variant switch - toggle switch style
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-surface-2 border border-line flex items-center px-1 transition-colors duration-300 hover:border-gold"
      aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
    >
      {/* Track icons */}
      <Sun className="absolute left-1.5 w-3.5 h-3.5 text-gold-soft" />
      <Moon className="absolute right-1.5 w-3.5 h-3.5 text-muted" />

      {/* Thumb */}
      <div
        className={`w-5 h-5 bg-gold transition-transform duration-300 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

export default ThemeToggle
