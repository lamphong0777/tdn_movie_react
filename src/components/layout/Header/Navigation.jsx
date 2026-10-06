import { Link, useLocation } from 'react-router-dom'
import { NAVIGATION } from '../constants'

const DesktopNavigation = () => {
  const location = useLocation()

  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAVIGATION.map((item, idx) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className="group relative px-5 py-2.5 flex items-center gap-2 transition-colors"
          >
            <span
              className={`text-[10px] tracking-editorial font-mono transition-colors ${
                isActive ? 'text-gold' : 'text-muted group-hover:text-gold'
              }`}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span
              className={`text-sm font-semibold tracking-wide transition-colors ${
                isActive ? 'text-cream' : 'text-muted group-hover:text-cream'
              }`}
            >
              {item.name}
            </span>
            <span
              className={`absolute bottom-0 left-5 right-5 h-px bg-gold transition-transform duration-300 origin-left ${
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
        )
      })}
    </nav>
  )
}

const MobileNavigation = ({ onNavigate }) => {
  const location = useLocation()

  return (
    <nav className="flex flex-col">
      {NAVIGATION.map((item, idx) => {
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-4 py-3 border-l-2 transition-all ${
              isActive
                ? 'border-gold bg-surface text-cream'
                : 'border-transparent text-muted hover:border-line-strong hover:text-cream'
            }`}
          >
            <span
              className={`text-[10px] tracking-editorial font-mono ${
                isActive ? 'text-gold' : 'text-muted'
              }`}
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-semibold tracking-wide">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export { DesktopNavigation, MobileNavigation }
