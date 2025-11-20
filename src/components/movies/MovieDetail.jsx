import { useState, useEffect } from 'react'
import {
  FiHeart,
  FiStar,
  FiClock,
  FiGlobe,
  FiFilm,
  FiAward,
  FiArrowLeft,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import styles from './movieDetail.module.css'

const MovieDetail = ({ movieDetail, toggleFavorite, isFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const navigate = useNavigate()
  const isFavorited = movieDetail && isFavorite(movieDetail.imdbID)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!movieDetail) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando detalles de la película...</p>
      </div>
    )
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(movieDetail)
  }

  const renderRating = (source, value) => {
    if (!value) return null

    let displayValue = value
    if (source === 'Internet Movie Database') {
      displayValue = `${value}/10`
    } else if (source === 'Rotten Tomatoes') {
      displayValue = value
    } else if (source === 'Metacritic') {
      displayValue = value.replace('/', '/100')
    }

    return (
      <div key={source} className={styles.ratingItem}>
        <span className={styles.ratingSource}>{source.split(' ')[0]}:</span>
        <span className={styles.ratingValue}>{displayValue}</span>
      </div>
    )
  }

  return (
    <div className={styles.movieDetailContainer}>
      <div className={styles.movieHeader}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <FiArrowLeft /> Volver
        </button>
        <h1 className={styles.movieTitle}>
          {movieDetail.Title}{' '}
          <span className={styles.movieYear}>({movieDetail.Year})</span>
        </h1>

        <div className={styles.movieMeta}>
          {movieDetail.Rated && (
            <span className={styles.ratingBadge}>{movieDetail.Rated}</span>
          )}
          <span className={styles.metaItem}>
            <FiClock /> {movieDetail.Runtime}
          </span>
          <span className={styles.metaItem}>
            <FiGlobe /> {movieDetail.Language?.split(', ')[0]}
          </span>
          {movieDetail.imdbRating && (
            <span className={styles.imdbRating}>
              <FiStar className={styles.starIcon} /> {movieDetail.imdbRating}/10
            </span>
          )}
        </div>

        <div className={styles.genreList}>
          {movieDetail.Genre?.split(', ').map((genre) => (
            <span key={genre} className={styles.genreTag}>
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.movieContent}>
        <div className={styles.posterContainer}>
          {movieDetail.Poster !== 'N/A' ? (
            <>
              <img
                src={movieDetail.Poster}
                alt={`Póster de ${movieDetail.Title}`}
                className={`${styles.moviePoster} ${
                  imageLoaded ? styles.loaded : ''
                }`}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              {!imageLoaded && <div className={styles.posterSkeleton}></div>}
            </>
          ) : (
            <div className={styles.posterPlaceholder}>
              <FiFilm className={styles.placeholderIcon} />
              <span>No hay póster disponible</span>
            </div>
          )}

          <button
            onClick={handleFavoriteClick}
            className={`${styles.favoriteButton} ${
              isFavorited ? styles.favorited : ''
            }`}
            aria-label={
              isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'
            }
          >
            <FiHeart className={styles.heartIcon} />
            {isFavorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>

        <div className={styles.movieInfo}>
          {movieDetail.Plot && movieDetail.Plot !== 'N/A' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Sinopsis</h2>
              <p className={styles.plotText}>{movieDetail.Plot}</p>
            </section>
          )}

          <div className={styles.detailsGrid}>
            {movieDetail.Director && movieDetail.Director !== 'N/A' && (
              <div className={styles.detailItem}>
                <h3>Director</h3>
                <p>{movieDetail.Director}</p>
              </div>
            )}

            {movieDetail.Writer && movieDetail.Writer !== 'N/A' && (
              <div className={styles.detailItem}>
                <h3>Guionista</h3>
                <p>{movieDetail.Writer}</p>
              </div>
            )}

            {movieDetail.Actors && movieDetail.Actors !== 'N/A' && (
              <div className={styles.detailItem}>
                <h3>Reparto</h3>
                <p>{movieDetail.Actors}</p>
              </div>
            )}

            {movieDetail.Country && movieDetail.Country !== 'N/A' && (
              <div className={styles.detailItem}>
                <h3>País</h3>
                <p>{movieDetail.Country}</p>
              </div>
            )}

            {movieDetail.Language && movieDetail.Language !== 'N/A' && (
              <div className={styles.detailItem}>
                <h3>Idioma</h3>
                <p>{movieDetail.Language}</p>
              </div>
            )}

            {movieDetail.Production && movieDetail.Production !== 'N/A' && (
              <div className={styles.detailItem}>
                <h3>Producción</h3>
                <p>{movieDetail.Production}</p>
              </div>
            )}

            {movieDetail.Released && movieDetail.Released !== 'N/A' && (
              <div className={styles.detailItem}>
                <h3>Fecha de estreno</h3>
                <p>
                  {new Date(movieDetail.Released).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>

          {movieDetail.Ratings?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <FiAward /> Calificaciones
              </h2>
              <div className={styles.ratingsContainer}>
                {movieDetail.Ratings.map((rating) =>
                  renderRating(rating.Source, rating.Value)
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
