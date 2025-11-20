import { useState } from 'react'
import movieService from '../services/movieService'
import SearchBar from '../components/common/SearchBar'
import MovieGrid from '../components/movies/MovieGrid'
import styles from './home.module.css'
import Loading from '../components/common/Loading'
import ErrorMessage from '../components/common/ErrorMessage'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [titleMovie, setTitleMovie] = useState('')
  const [loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)

  const handleSubmitSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await movieService.getMovies(titleMovie)

      if (data.Search && data.Search.length > 0) {
        setMovies(data.Search)
      } else {
        setMovies([])
        setError('No se encontraron películas con ese titulo: ' + titleMovie)
      }

      setTitleMovie('')
    } catch (error) {
      setError(error.message || 'No se pudieron cargar las películas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>MovieFlix</h1>

      <div className={styles.searchContainer}>
        <SearchBar
          handleSubmitSearch={handleSubmitSearch}
          titleMovie={titleMovie}
          setTitleMovie={setTitleMovie}
        />
      </div>

      <div className={styles.movieGridContainer}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : Error ? (
          <div className={styles.errorContainer}>
            <ErrorMessage message={Error} />
          </div>
        ) : movies.length > 0 ? (
          <div className={styles.animateFadeIn}>
            <MovieGrid movies={movies} />
          </div>
        ) : (
          <div className={`${styles.emptyState} ${styles.animateFadeIn}`}>
            <div className={styles.emptyStateIcon}>🎬</div>
            <h3>¡Bienvenido a MovieFlix!</h3>
            <p className={styles.emptyStateText}>
              Busca tus películas favoritas en la barra de búsqueda superior.
              Encuentra información sobre cualquier película que desees.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
