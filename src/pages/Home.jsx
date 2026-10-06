// src/pages/Home.jsx
import { ArrowUpRight, Loader2, Play, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BannerSlider from '../components/BannerSlider/BannerSlider'
import GenreFilter from '../components/GenreFilter'
import useBannerMovies from '../hooks/useBannerMovies'
import useGenres from '../hooks/useGenres'
import useMoviesByGenre from '../hooks/useMoviesByGenre'
import { topMovies } from '../mocks'

const Home = () => {
  const [activeGenreSlug, setActiveGenreSlug] = useState('all')

  const { movies: bannerMovies, loading: bannerLoading } = useBannerMovies(5)
  const { genres, loading: genresLoading } = useGenres()
  const {
    movies,
    loading: moviesLoading,
    error: moviesError,
  } = useMoviesByGenre(activeGenreSlug, 1)

  const genresWithAll = useMemo(() => {
    return [{ _id: 'all', name: 'Tất cả', slug: 'all' }, ...genres]
  }, [genres])

  return (
    <div className="min-h-screen bg-bg">
      {/* Banner */}
      <BannerSlider
        key={bannerMovies.length || 'loading'}
        movies={bannerMovies}
        isLoading={bannerLoading}
      />

      {/* ============ SECTION 01 ============ */}
      <section className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end mb-12 border-b border-line pb-6">
          <div className="col-span-12 md:col-span-2">
            <span className="text-editorial-num text-7xl md:text-8xl text-gold/20 select-none">
              01
            </span>
          </div>
          <div className="col-span-12 md:col-span-7">
            <span className="tracking-editorial text-xs text-gold block mb-2">— Tuyển tập mới</span>
            <h2 className="text-3xl md:text-5xl font-bold text-cream">
              {activeGenreSlug === 'all' ? 'Phim mới cập nhật' : 'Phim theo thể loại'}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:justify-end">
            <button className="group flex items-center gap-2 text-sm tracking-editorial text-muted hover:text-gold transition-colors cursor-pointer">
              Xem tất cả
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ===== Genre filter mới ===== */}
        <GenreFilter
          genres={genresWithAll}
          activeSlug={activeGenreSlug}
          onChange={setActiveGenreSlug}
          isLoading={genresLoading}
        />

        {/* Loading */}
        {moviesLoading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-gold animate-spin" />
            <p className="text-muted tracking-editorial text-xs mt-4">ĐANG TẢI PHIM...</p>
          </div>
        )}

        {/* Error */}
        {!moviesLoading && moviesError && (
          <div className="flex flex-col items-center justify-center py-32 border border-line">
            <p className="text-danger mb-4">{moviesError}</p>
          </div>
        )}

        {/* Empty */}
        {!moviesLoading && !moviesError && movies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 border border-line">
            <p className="text-muted tracking-editorial text-xs">
              KHÔNG CÓ PHIM NÀO TRONG THỂ LOẠI NÀY
            </p>
          </div>
        )}

        {/* Movie grid */}
        {!moviesLoading && !moviesError && movies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px bg-line">
            {movies.map((movie, idx) => (
              <Link
                to={`/phim/${movie.slug}`}
                key={movie.id}
                className="group relative bg-bg cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-2/3 overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-transparent opacity-90" />
                  <span className="absolute top-3 left-3 text-editorial-num text-4xl text-cream/30 group-hover:text-gold transition-colors select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {movie.isNew && (
                      <span className="bg-gold text-inverse text-[10px] tracking-editorial px-2 py-1 font-bold">
                        MỚI
                      </span>
                    )}
                    {movie.isHot && (
                      <span className="bg-cream text-inverse text-[10px] tracking-editorial px-2 py-1 font-bold">
                        HOT
                      </span>
                    )}
                    {movie.isSeries && movie.seasonNumber && (
                      <span className="bg-surface-2 text-cream text-[10px] tracking-editorial px-2 py-1 font-bold border border-line">
                        S{movie.seasonNumber}
                      </span>
                    )}
                  </div>

                  {movie.rating > 0 && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 border border-line-gold bg-bg/80 backdrop-blur-sm px-2 py-1">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span className="text-cream text-xs font-semibold">
                        {movie.rating.toFixed(1)}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gold p-4 border-2 border-gold">
                      <Play className="w-6 h-6 text-inverse fill-inverse" />
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t border-line group-hover:border-line-gold transition-colors">
                  <h3
                    className="text-cream font-semibold text-sm truncate group-hover:text-gold transition-colors"
                    title={movie.title}
                  >
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] tracking-editorial text-muted mt-1">
                    <span>{movie.year}</span>
                    <span className="truncate ml-2 text-right">
                      {movie.isSeries ? 'PHIM BỘ' : 'PHIM LẺ'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ============ SECTION 02 ============ */}
      <section className="container mx-auto px-4 py-20 border-t border-line">
        <div className="grid grid-cols-12 gap-6 items-end mb-12 border-b border-line pb-6">
          <div className="col-span-12 md:col-span-2">
            <span className="text-editorial-num text-7xl md:text-8xl text-gold/20 select-none">
              02
            </span>
          </div>
          <div className="col-span-12 md:col-span-10">
            <span className="tracking-editorial text-xs text-gold block mb-2">— Bảng xếp hạng</span>
            <h2 className="text-3xl md:text-5xl font-bold text-cream">Top phim đánh giá cao</h2>
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {topMovies.map((movie, index) => (
            <article
              key={movie.id}
              className="group grid grid-cols-12 gap-4 items-center py-5 hover:bg-surface transition-colors cursor-pointer"
            >
              <div className="col-span-2 md:col-span-1 flex items-center justify-center">
                <span className="text-editorial-num text-5xl md:text-6xl text-line group-hover:text-gold transition-colors select-none">
                  {index + 1}
                </span>
              </div>

              <div className="col-span-3 md:col-span-1">
                <div className="aspect-2/3 overflow-hidden border border-line group-hover:border-line-gold transition-colors">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              <div className="col-span-7 md:col-span-8">
                <h3 className="text-cream text-lg md:text-2xl font-semibold mb-1 group-hover:text-gold transition-colors">
                  {movie.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs tracking-editorial text-muted">
                  <span>{movie.year}</span>
                  <span className="w-px h-3 bg-line" />
                  <span className="flex items-center gap-1 text-gold">
                    <Star className="w-3 h-3 fill-gold" />
                    {movie.rating}
                  </span>
                </div>
              </div>

              <div className="hidden md:flex col-span-2 justify-end">
                <button className="group/btn flex items-center gap-2 border border-line px-4 py-2 text-xs tracking-editorial text-muted hover:border-gold hover:text-gold transition-all cursor-pointer">
                  Xem ngay
                  <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
