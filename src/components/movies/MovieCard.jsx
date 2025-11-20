import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiFilm, FiImage, FiInfo } from 'react-icons/fi'
import { useFavorites } from '../../hooks/useFavorites'
import styles from './movieCard.module.css'

const MovieCard = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useFavorites()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const isFavorited = isFavorite(movie.imdbID)

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  const testImageLoad = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const [validImageUrl, setValidImageUrl] = useState(
    movie.Poster !== 'N/A' ? movie.Poster : null
  )

  useEffect(() => {
    const checkImage = async () => {
      if (movie.Poster === 'N/A') {
        setImageError(true)
        return
      }

      const isValid = await testImageLoad(movie.Poster)
      if (!isValid) {
        setImageError(true)
        setValidImageUrl(null)
      }
    }

    checkImage()
  }, [movie.Poster])

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <article className={styles.movieCard}>
      {!validImageUrl ? (
        <div className={styles.moviePosterContainer}>
          <div className={styles.posterPlaceholder}>
            {imageError ? (
              <>
                <FiImage className={styles.placeholderIcon} />
                <span>Error al cargar la imagen</span>
              </>
            ) : (
              <>
                <FiFilm className={styles.placeholderIcon} />
                <span>No hay póster disponible</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.moviePosterContainer}>
          <img
            className={`${styles.moviePoster} ${
              imageLoaded ? styles.loaded : ''
            }`}
            src={validImageUrl}
            alt={`Póster de ${movie.Title}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
          />
          {!imageLoaded && !imageError && (
            <div className={styles.imageLoader}>
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
      )}

      <div className={styles.movieInfo}>
        <h2 className={styles.movieTitle} title={movie.Title}>
          {movie.Title}
        </h2>
      </div>

      <div className={styles.movieButtonContainer}>
        <Link
          to={`/movies/${movie.imdbID}`}
          className={`${styles.movieButton} ${styles.detailsButton}`}
          aria-label={`Ver detalles de ${movie.Title}`}
        >
          <FiInfo className={styles.icon} />
          <span>Detalles</span>
        </Link>

        <button
          onClick={handleFavoriteClick}
          className={`${styles.movieButton} ${
            isFavorited ? styles.favoriteButton : ''
          }`}
          data-favorite={isFavorited}
          aria-label={
            isFavorited
              ? `Quitar ${movie.Title} de favoritos`
              : `Agregar ${movie.Title} a favoritos`
          }
        >
          <FiHeart
            className={styles.icon}
            fill={isFavorited ? 'currentColor' : 'none'}
          />
          <span>{isFavorited ? 'Quitar' : 'Guardar'}</span>
        </button>
      </div>
    </article>
  )
}

export default MovieCard
