export const THEME_STORAGE_KEY = 'moviehub-theme'
export const THEME_DARK = 'dark'
export const THEME_LIGHT = 'light'

// Hàm lấy theme ban đầu từ localStorage / system
export const getInitialTheme = () => {
  if (typeof window === 'undefined') return THEME_DARK

  // 1. Ưu tiên lấy từ localStorage
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === THEME_LIGHT || storedTheme === THEME_DARK) {
    return storedTheme
  }

  // 2. Fallback theo system preference
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return THEME_LIGHT
  }

  // 3. Mặc định là dark (giữ màu cũ)
  return THEME_DARK
}

// Hàm áp dụng theme vào DOM
export const applyThemeToDOM = (theme) => {
  const root = document.documentElement

  if (theme === THEME_DARK) {
    root.classList.add('dark')
    root.style.colorScheme = 'dark'
  } else {
    root.classList.remove('dark')
    root.style.colorScheme = 'light'
  }
}
