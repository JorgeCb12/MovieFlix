import { useEffect, useState } from 'react'
import FavoritesContext from './FavoritesContext'

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movieflix-favorites')
    if (saved) {
      return JSON.parse(saved)
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('movieflix-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie])
    }
  }

  const removeFavorite = (imdbID) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID))
  }

  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID)
  }

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
