import { useEffect, useState } from 'react'
import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_STORAGE_KEY,
  applyThemeToDOM,
  getInitialTheme,
} from '../constants/theme'
import ThemeContext from './theme-context'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  // Áp dụng theme vào html element
  useEffect(() => {
    applyThemeToDOM(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  // Lắng nghe thay đổi system preference (chỉ khi user chưa chọn)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (!stored) {
        setTheme(e.matches ? THEME_DARK : THEME_LIGHT)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK))
  }

  const setLightTheme = () => setTheme(THEME_LIGHT)
  const setDarkTheme = () => setTheme(THEME_DARK)

  const value = {
    theme,
    isDark: theme === THEME_DARK,
    isLight: theme === THEME_LIGHT,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Chỉ export duy nhất component - không export hook hay constant
export default ThemeProvider
