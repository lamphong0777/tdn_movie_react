// src/components/layout/Footer/FooterBrand.jsx
import { Clapperboard } from 'lucide-react'

const FooterBrand = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Clapperboard className="w-5 h-5 text-gold" />
          <span className="tracking-editorial text-xs text-gold">— VSMOV CINEMA</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-cream leading-none">
          Xem phim <span className="text-gold italic">chất</span>
          <br />
          không quảng cáo.
        </h2>
      </div>
      <p className="text-muted text-sm max-w-sm leading-relaxed">
        Nền tảng xem phim trực tuyến chất lượng cao. Cập nhật phim mới mỗi ngày, phụ đề tiếng Việt,
        không quảng cáo làm phiền.
      </p>
    </div>
  )
}

export default FooterBrand
