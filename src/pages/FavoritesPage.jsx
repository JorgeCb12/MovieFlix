import { useFavorites } from '../hooks/useFavorites'
import MovieGrid from '../components/movies/MovieGrid'
import { FiHeart, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import styles from './favoritesPage.module.css'

const FavoritesPage = () => {
  const { favorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <div className={styles.heartIconContainer}>
            <FiHeart className={styles.heartIcon} />
          </div>
          <h1>Tu lista de favoritos está vacía</h1>
          <p>Agrega películas a tus favoritos para verlas aquí</p>
          <Link to="/" className={styles.browseButton}>
            <FiArrowLeft className={styles.arrowIcon} />
            Explorar películas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <FiHeart className={styles.titleIcon} />
            Mis Favoritos
            <span className={styles.countBadge}>{favorites.length}</span>
          </h1>
          <p className={styles.subtitle}>
            {favorites.length === 1
              ? 'Tienes 1 película guardada'
              : `Tienes ${favorites.length} películas guardadas`}
          </p>
        </div>
      </div>

      <div className={styles.moviesContainer}>
        <MovieGrid movies={favorites} />
      </div>
    </div>
  )
}

export default FavoritesPage
