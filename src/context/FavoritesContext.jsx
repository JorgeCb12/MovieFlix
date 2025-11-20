import { createContext, useState, useEffect, useCallback } from 'react'

const FAVORITES_KEY = 'movieFlixFavorites'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY)
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error)
      }
    }
  }, [favorites, isLoading])

  const toggleFavorite = useCallback((movie) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (fav) => fav.imdbID === movie.imdbID
      )

      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID)
      } else {
        return [...prevFavorites, movie]
      }
    })
  }, [])

  const isFavorite = useCallback(
    (movieId) => {
      return favorites.some((movie) => movie.imdbID === movieId)
    },
    [favorites]
  )

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesContext
