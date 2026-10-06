import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Clock,
  Crown,
  Film,
  Ghost,
  Laugh,
  Loader2,
  Skull,
  Sparkles,
  Star,
  Theater,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useGenrePreview from '../hooks/useGenrePreview'
import useGenres from '../hooks/useGenres'

const ICONS = {
  Zap,
  Sparkles,
  Ghost,
  Brain,
  Crown,
  Skull,
  BookOpen,
  Laugh,
  Theater,
  Film,
  TrendingUp,
  Clock,
  Star,
}

// Map slug → icon + màu (từ API)
const GENRE_ICON_MAP = {
  'hanh-dong': 'Zap',
  'hanh-dong-phieu-luu': 'Zap',
  'action-adventure': 'Zap',
  'vien-tuong': 'Sparkles',
  'khoa-hoc-vien-tuong': 'Sparkles',
  'khoa-hoc-vien-tuong-gia-tuong': 'Sparkles',
  'sci-fi-fantasy': 'Sparkles',
  'gia-tuong': 'Sparkles',
  'kinh-di': 'Ghost',
  'bi-an': 'Brain',
  'giat-gan': 'Brain',
  'chinh-kich': 'Theater',
  drama: 'Theater',
  'co-trang': 'Crown',
  'toi-pham': 'Skull',
  'hinh-su': 'Skull',
  'xa-hoi-den': 'Skull',
  'tieu-thuyet-chuyen-the': 'BookOpen',
  'truyen-hinh-thuc-te': 'BookOpen',
  hai: 'Laugh',
  'hoat-hinh': 'Film',
  'chien-tranh': 'TrendingUp',
  'chinh-tri-chien-tranh': 'TrendingUp',
  'vo-thuat': 'Zap',
  'vo-hiep': 'Zap',
  'kiem-hiep': 'Zap',
  'tien-hiep': 'Sparkles',
  'thanh-xuan': 'Star',
  'hoc-duong': 'Star',
  'tinh-yeu-ngot-ngao': 'Star',
  'lang-man': 'Star',
  'lang-mang': 'Star',
}

const Genres = () => {
  // Fetch thể loại từ API
  const { genres, loading: genresLoading, error } = useGenres()

  // Preview phim cho từng thể loại (lazy load)
  const { previews, fetchPreview } = useGenrePreview()

  // Thống kê từ data thực
  const stats = useMemo(() => {
    if (!genres.length) return []

    return [
      {
        iconName: 'Film',
        value: genres.length.toString(),
        label: 'TỔNG THỂ LOẠI',
      },
      {
        iconName: 'TrendingUp',
        value: '20K+',
        label: 'PHIM ĐANG CÓ',
      },
      {
        iconName: 'Star',
        value: '4.8',
        label: 'ĐÁNH GIÁ TB',
      },
      {
        iconName: 'Clock',
        value: '24/7',
        label: 'CẬP NHẬT',
      },
    ]
  }, [genres])

  // Loading state
  if (genresLoading) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-6 items-end mb-16 border-b border-line pb-8">
            <div className="col-span-12 md:col-span-2">
              <span className="text-editorial-num text-7xl md:text-8xl text-gold/20 select-none">
                04
              </span>
            </div>
            <div className="col-span-12 md:col-span-10">
              <span className="tracking-editorial text-xs text-gold block mb-2">— Thư viện</span>
              <h1 className="text-4xl md:text-6xl font-black text-cream leading-none">
                Thể loại <span className="text-gold italic">phim</span>
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
            <p className="text-muted tracking-editorial text-xs mt-4">ĐANG TẢI THỂ LOẠI...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-bg py-16">
        <div className="container mx-auto px-4">
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="container mx-auto px-4">
        {/* ============ HEADER EDITORIAL ============ */}
        <div className="grid grid-cols-12 gap-6 items-end mb-16 border-b border-line pb-8">
          <div className="col-span-12 md:col-span-2">
            <span className="text-editorial-num text-7xl md:text-8xl text-gold/20 select-none">
              04
            </span>
          </div>
          <div className="col-span-12 md:col-span-10">
            <span className="tracking-editorial text-xs text-gold block mb-2">— Thư viện</span>
            <h1 className="text-4xl md:text-6xl font-black text-cream leading-none">
              Thể loại <span className="text-gold italic">phim</span>
            </h1>
            <p className="text-muted mt-4 max-w-2xl text-sm leading-relaxed">
              Khám phá hàng ngàn bộ phim thuộc nhiều thể loại khác nhau — từ hành động kịch tính đến
              tâm lý sâu lắng.
            </p>
          </div>
        </div>

        {/* ============ STATS — GRID VUÔNG ============ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line mb-16">
          {stats.map((stat, index) => {
            const Icon = ICONS[stat.iconName] || Film
            return (
              <div
                key={index}
                className="bg-bg p-6 group hover:bg-surface transition-colors cursor-default"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                  <span className="text-editorial-num text-2xl text-line group-hover:text-gold/40 transition-colors select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-3xl md:text-4xl font-black text-cream">{stat.value}</p>
                <p className="text-[11px] tracking-editorial text-muted mt-1">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* ============ GENRES GRID ============ */}
        <div className="mb-6 flex items-center gap-4">
          <span className="tracking-editorial text-xs text-gold">— Tất cả thể loại</span>
          <span className="flex-1 h-px bg-line" />
          <span className="text-[11px] tracking-editorial text-muted">
            {genres.length} thể loại
          </span>
        </div>

        {genres.length === 0 ? (
          <div className="text-center py-24 border border-line mb-20">
            <span className="text-editorial-num text-8xl text-gold/20 block mb-4">∅</span>
            <p className="text-muted tracking-editorial text-sm">Không có thể loại nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line mb-20">
            {genres.map((genre, idx) => {
              const iconName = GENRE_ICON_MAP[genre.slug] || 'Film'
              const Icon = ICONS[iconName] || Film
              const preview = previews[genre.slug] || []

              return (
                <Link
                  key={genre._id}
                  to={`/genres/${genre.slug}`}
                  onMouseEnter={() => fetchPreview(genre.slug)}
                  className="group relative bg-bg p-6 hover:bg-surface transition-colors cursor-pointer overflow-hidden"
                >
                  {/* Số thứ tự lớn ở background */}
                  <span className="absolute -top-4 -right-2 text-editorial-num text-[120px] text-line/40 group-hover:text-gold/10 transition-colors select-none pointer-events-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    {/* Icon + count */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 border border-line group-hover:border-gold transition-colors">
                        <Icon className="w-6 h-6 text-cream group-hover:text-gold transition-colors" />
                      </div>
                      <span className="text-[10px] tracking-editorial text-muted border border-line px-2 py-1 group-hover:border-line-gold group-hover:text-gold transition-colors">
                        THỂ LOẠI
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-cream mb-2 group-hover:text-gold transition-colors">
                      {genre.name}
                    </h3>

                    {/* Description — dùng placeholder */}
                    <p className="text-muted text-sm mb-5 line-clamp-2 leading-relaxed">
                      Khám phá những bộ phim {genre.name.toLowerCase()} hấp dẫn nhất
                    </p>

                    {/* Mini movie preview */}
                    <div className="flex gap-px bg-line w-fit mb-6 min-h-[64px]">
                      {preview.length > 0 ? (
                        <>
                          {preview.map((movie) => (
                            <div
                              key={movie.id}
                              className="relative w-12 h-16 overflow-hidden bg-bg"
                            >
                              <img
                                src={movie.image}
                                alt={movie.title}
                                loading="lazy"
                                className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500"
                              />
                            </div>
                          ))}
                        </>
                      ) : (
                        // Placeholder khi chưa load preview
                        <>
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-12 h-16 bg-surface-2 animate-pulse border-l border-line first:border-l-0"
                            />
                          ))}
                        </>
                      )}
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex items-center gap-2 text-[11px] tracking-editorial text-muted group-hover:text-gold transition-colors">
                      KHÁM PHÁ
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* ============ SPOTLIGHT BANNER ============ */}
        <div className="relative border border-line-gold overflow-hidden">
          {/* Lớp nền gold mờ */}
          <div className="absolute inset-0 bg-linear-to-r from-gold/10 via-transparent to-transparent" />

          {/* Số lớn mờ bên phải */}
          <span className="absolute -bottom-10 right-4 text-editorial-num text-[200px] text-gold/5 select-none pointer-events-none">
            ★
          </span>

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="tracking-editorial text-xs text-gold block mb-3">
                — Gợi ý cho bạn
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-cream leading-tight mb-3">
                Khám phá thể loại
                <br />
                <span className="text-gold italic">yêu thích</span> của bạn
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Tìm kiếm và khám phá hàng ngàn bộ phim theo thể loại bạn yêu thích — từ bom tấn
                Hollywood đến phim nghệ thuật châu Á.
              </p>
            </div>

            <Link
              to="/genres/hanh-dong"
              className="group flex items-center gap-3 bg-gold hover:bg-gold-soft text-inverse px-8 py-4 font-bold tracking-editorial text-sm transition-all cursor-pointer shrink-0"
            >
              <Zap className="w-4 h-4 fill-inverse" />
              Xem ngay
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Genres
