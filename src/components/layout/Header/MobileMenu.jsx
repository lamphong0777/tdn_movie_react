import { ArrowUpRight, CircleUserRound } from 'lucide-react'
import { MobileNavigation } from './Navigation'
import { ThemeToggleText } from './ThemeToggle'

const MobileMenu = ({ onClose }) => {
  return (
    <div className="md:hidden py-4 border-t border-line">
      <nav className="flex flex-col">
        <MobileNavigation onNavigate={onClose} />

        {/* Theme toggle cho mobile */}
        <ThemeToggleText />

        {/* Nút đăng nhập */}
        <button className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-soft text-inverse px-4 py-3 text-xs font-bold tracking-editorial transition-all mt-3 cursor-pointer">
          <CircleUserRound className="w-4 h-4" />
          Đăng nhập
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </nav>
    </div>
  )
}

export default MobileMenu
