import { Moon, Sun } from 'lucide-react'
import useTheme from '../../../hooks/useTheme'

export const ThemeToggleIcon = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
      className="group relative p-2.5 border border-line hover:border-gold text-muted hover:text-gold transition-colors cursor-pointer overflow-hidden"
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

// Text toggle - dùng cho mobile menu
export const ThemeToggleText = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 px-4 py-3 border-l-2 border-transparent text-muted hover:border-line-strong hover:text-cream transition-all"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">Chế độ sáng</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">Chế độ tối</span>
        </>
      )}
    </button>
  )
}
