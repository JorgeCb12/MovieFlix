import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetailPage from './pages/MovieDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import Navbar from './components/layout/Navbar'
import FavoritesProvider from './context/FavoritesProvider'

function App() {
  return (
    <>
      <FavoritesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </FavoritesProvider>
    </>
  )
}

export default App
