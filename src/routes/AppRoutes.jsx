import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Countries from '../pages/Countries'
import CountryDetail from '../pages/CountryDetail'
import GenreDetail from '../pages/GenreDetail'
import Genres from '../pages/Genres'
import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'
import Movies from '../pages/Movies'
import Series from '../pages/Series'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:genreSlug" element={<GenreDetail />} />
        <Route path="/quoc-gia" element={<Countries />} />
        <Route path="/quoc-gia/:countrySlug" element={<CountryDetail />} />
        <Route path="/phim/:slug" element={<MovieDetail />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
