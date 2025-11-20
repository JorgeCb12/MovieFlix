import { useMemo } from 'react'
import MovieCard from './MovieCard'
import styles from './movieGrid.module.css'

const MovieGrid = ({ movies }) => {
  const getUniqueKey = (movie, index) => {
    return `${movie.imdbID}_${index}`
  }

  const uniqueMovies = useMemo(() => {
    const uniqueMap = new Map()

    return movies.filter((movie) => {
      if (uniqueMap.has(movie.imdbID)) {
        return false
      }
      uniqueMap.set(movie.imdbID, true)
      return true
    })
  }, [movies])

  return (
    <div className={styles.movieGridContainer}>
      <h2 className={styles.movieGridTitle}>Películas y Series</h2>
      <div className={styles.movieGrid}>
        {uniqueMovies.map((movie, index) => (
          <MovieCard key={getUniqueKey(movie, index)} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
