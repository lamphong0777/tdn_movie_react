import { Clapperboard } from 'lucide-react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="group flex items-center gap-3 shrink-0">
      <div className="relative">
        <Clapperboard className="w-7 h-7 text-gold transition-transform duration-300 group-hover:rotate-[-8deg]" />
        {/* Chấm nhấp nháy kiểu recording */}
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gold animate-gold-pulse" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-black tracking-[0.25em] text-cream group-hover:text-gold transition-colors">
          VSMOV
        </span>
        <span className="text-[8px] tracking-[0.4em] text-muted mt-0.5">CINEMA</span>
      </div>
    </Link>
  )
}

export default Logo
