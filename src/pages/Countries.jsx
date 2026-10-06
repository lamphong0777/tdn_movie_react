import { ArrowUpRight, Globe, Loader2, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useCountries from '../hooks/useCountries'

const Countries = () => {
  const { countries, loading, error } = useCountries()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter theo search
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries
    const term = searchTerm.toLowerCase()
    return countries.filter((c) => c.name.toLowerCase().includes(term))
  }, [countries, searchTerm])

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        {/* ============ HEADER ============ */}
        <div className="grid grid-cols-12 gap-6 items-end mb-16 border-b border-line pb-8">
          <div className="col-span-12 md:col-span-2">
            <span className="text-editorial-num text-7xl md:text-8xl text-gold/20 select-none">
              07
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="tracking-editorial text-xs text-gold block mb-2">
              — Địa lý điện ảnh
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-cream leading-none">
              Quốc <span className="text-gold italic">gia</span>
            </h1>
            <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed">
              Khám phá kho tàng điện ảnh từ khắp nơi trên thế giới — Hollywood, Hàn Quốc, Nhật Bản,
              Trung Quốc và nhiều hơn nữa.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <div className="flex items-center border border-line focus-within:border-gold bg-surface/40 transition-colors w-full md:w-auto">
              <Search className="w-4 h-4 text-muted ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Tìm quốc gia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-cream px-3 py-2.5 text-sm w-full md:w-56 placeholder:text-muted"
              />
            </div>
          </div>
        </div>

        {/* ============ LOADING ============ */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
            <p className="text-muted tracking-editorial text-xs mt-4">ĐANG TẢI QUỐC GIA...</p>
          </div>
        )}

        {/* ============ ERROR ============ */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32 border border-line">
            <span className="text-editorial-num text-8xl text-danger/20 block mb-4">!</span>
            <p className="text-danger tracking-editorial text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="border border-line px-6 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* ============ EMPTY ============ */}
        {!loading && !error && filteredCountries.length === 0 && (
          <div className="text-center py-24 border border-line">
            <span className="text-editorial-num text-8xl text-gold/20 block mb-4">∅</span>
            <p className="text-muted tracking-editorial text-sm">
              {searchTerm ? 'Không tìm thấy quốc gia nào' : 'Không có quốc gia nào'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 border border-line px-6 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>
        )}

        {/* ============ COUNT + GRID ============ */}
        {!loading && !error && filteredCountries.length > 0 && (
          <>
            <div className="mb-6 flex items-center gap-4">
              <span className="tracking-editorial text-xs text-gold">— Tất cả quốc gia</span>
              <span className="flex-1 h-px bg-line" />
              <span className="text-[11px] tracking-editorial text-muted">
                {filteredCountries.length} quốc gia
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-line mb-20">
              {filteredCountries.map((country, idx) => (
                <Link
                  key={country._id}
                  to={`/quoc-gia/${country.slug}`}
                  className="group relative bg-bg p-6 hover:bg-surface transition-colors cursor-pointer overflow-hidden"
                >
                  {/* Số thứ tự lớn ở background */}
                  <span className="absolute -top-4 -right-2 text-editorial-num text-[100px] text-line/40 group-hover:text-gold/10 transition-colors select-none pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    {/* Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 border border-line group-hover:border-gold transition-colors">
                        <Globe className="w-6 h-6 text-cream group-hover:text-gold transition-colors" />
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-cream mb-2 group-hover:text-gold transition-colors">
                      {country.name}
                    </h3>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-[11px] tracking-editorial text-muted group-hover:text-gold transition-colors">
                      KHÁM PHÁ
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ============ SPOTLIGHT ============ */}
        <div className="relative border border-line-gold overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-gold/10 via-transparent to-transparent" />
          <span className="absolute -bottom-10 right-4 text-editorial-num text-[200px] text-gold/5 select-none pointer-events-none">
            🌏
          </span>

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="tracking-editorial text-xs text-gold block mb-3">
                — Điện ảnh không biên giới
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-cream leading-tight mb-3">
                Khám phá điện ảnh
                <br />
                từ <span className="text-gold italic">mọi quốc gia</span>
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Từ Hollywood hoa lệ đến những tác phẩm nghệ thuật đầy tinh tế từ châu Á — tất cả đều
                có tại VSMOV.
              </p>
            </div>

            <Link
              to="/quoc-gia/nhat-ban"
              className="group flex items-center gap-3 bg-gold hover:bg-gold-soft text-inverse px-8 py-4 font-bold tracking-editorial text-sm transition-all cursor-pointer shrink-0"
            >
              <Globe className="w-4 h-4" />
              Nhật Bản
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Countries
