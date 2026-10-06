import { Calendar, ChevronLeft, ChevronRight, Clock, Info, Play, Star } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { bannerMovies as defaultMovies } from '../../mocks'

const BannerSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const bannerMovies = movies && movies.length > 0 ? movies : defaultMovies
  const totalSlides = bannerMovies.length
  const resumeTimeoutRef = useRef(null)

  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  useEffect(() => () => resumeTimeoutRef.current && clearTimeout(resumeTimeoutRef.current), [])

  const pauseTemporarily = useCallback(() => {
    setIsAutoPlaying(false)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 8000)
  }, [])

  const goToSlide = (i) => (setCurrentIndex(i), pauseTemporarily())
  const prevSlide = () => (
    setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides),
    pauseTemporarily()
  )
  const nextSlide = () => (setCurrentIndex((p) => (p + 1) % totalSlides), pauseTemporarily())

  const currentMovie = bannerMovies[currentIndex]
  if (!currentMovie) return null

  return (
    <div
      className="relative h-[85vh] w-full overflow-hidden bg-bg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* ===== Background ===== */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentMovie.banner})` }}
      >
        {/* Overlay tối editorial */}
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/70 to-bg/30" />
        <div className="absolute inset-0 bg-linear-to-r from-bg via-bg/50 to-transparent" />
      </div>

      {/* ===== Viền khung ảnh editorial ===== */}
      <div className="absolute inset-6 md:inset-10 border border-line-gold/40 pointer-events-none z-10" />

      {/* ===== Content ===== */}
      <div className="relative h-full container mx-auto px-8 md:px-16 flex items-center z-20">
        <div key={currentIndex} className="max-w-3xl animate-slide-in-left">
          {/* Label nhỏ kiểu tạp chí */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-gold" />
            <span className="tracking-editorial text-xs text-gold">
              {currentMovie.isFeatured ? 'Phim nổi bật' : 'Phim mới'}
            </span>
          </div>

          {/* Title serif lớn */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-cream mb-6 leading-[0.95]">
            {currentMovie.title}
          </h1>

          {/* Meta row với separator */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
            {currentMovie.year && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" />
                {currentMovie.year}
              </span>
            )}
            {currentMovie.duration && (
              <>
                <span className="w-px h-4 bg-line" />
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  {currentMovie.duration}
                </span>
              </>
            )}
            <span className="w-px h-4 bg-line" />
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="text-cream font-semibold">{currentMovie.rating}</span>
              <span className="text-muted">/ 10</span>
            </span>
          </div>

          {/* Genres — chữ nhật, không bo */}
          {currentMovie.genre?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {currentMovie.genre.map((g, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-line text-xs tracking-editorial text-muted"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {currentMovie.description && (
            <p className="text-muted text-base md:text-lg mb-10 line-clamp-2 max-w-2xl leading-relaxed">
              {currentMovie.description}
            </p>
          )}

          {/* CTA buttons — vuông, không bo */}
          <div className="flex flex-wrap gap-4">
            <button className="group flex items-center gap-3 bg-gold hover:bg-gold-soft text-inverse px-8 py-4 font-bold tracking-editorial text-sm transition-all cursor-pointer">
              <Play className="w-4 h-4 fill-inverse" />
              Xem ngay
            </button>
            <button className="group flex items-center gap-3 border border-line hover:border-gold text-cream hover:text-gold px-8 py-4 font-bold tracking-editorial text-sm transition-all cursor-pointer">
              <Info className="w-4 h-4" />
              Chi tiết
            </button>
          </div>
        </div>
      </div>

      {/* ===== Navigation arrows — vuông, không bo ===== */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Phim trước"
            className="absolute left-8 top-1/2 -translate-y-1/2 border border-line hover:border-gold hover:bg-gold hover:text-inverse text-cream p-3 transition-all cursor-pointer z-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Phim tiếp theo"
            className="absolute right-8 top-1/2 -translate-y-1/2 border border-line hover:border-gold hover:bg-gold hover:text-inverse text-cream p-3 transition-all cursor-pointer z-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* ===== Dots — hình chữ nhật vuông ===== */}
      {totalSlides > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {bannerMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'w-10 h-1 bg-gold'
                  : 'w-10 h-1 bg-line hover:bg-line-strong'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BannerSlider
