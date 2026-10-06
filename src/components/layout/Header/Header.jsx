// src/components/layout/Header/Header.jsx
import { ArrowUpRight, CircleUserRound, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import SearchBox from '../../SearchBox'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { DesktopNavigation } from './Navigation'
import { ThemeToggleIcon } from './ThemeToggle'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-bg/95 backdrop-blur-md border-b border-line sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <DesktopNavigation />

          <div className="flex items-center gap-3">
            {/* ✅ Desktop Search - dùng SearchBox */}
            <div className="hidden lg:block w-64">
              <SearchBox variant="desktop" placeholder="Tìm phim..." />
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Tìm kiếm"
              className="lg:hidden p-2.5 border border-line hover:border-gold text-muted hover:text-gold transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            <ThemeToggleIcon />

            <button className="group hidden md:flex items-center gap-2 bg-gold hover:bg-gold-soft text-inverse px-5 py-2.5 text-xs font-bold tracking-editorial transition-all cursor-pointer">
              <CircleUserRound className="w-4 h-4" />
              Đăng nhập
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              className="md:hidden p-2.5 border border-line hover:border-gold text-cream hover:text-gold transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Search - dùng SearchBox */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t border-line">
            <SearchBox variant="mobile" placeholder="Tìm phim..." />
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </header>
  )
}

export default Header
