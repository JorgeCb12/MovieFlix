import { useParams } from 'react-router-dom'
import movieService from '../services/movieService'
import { useEffect, useState } from 'react'
import MovieDetail from '../components/movies/MovieDetail'
import { useFavorites } from '../hooks/useFavorites'
import Loading from '../components/common/Loading'
import ErrorMessage from '../components/common/ErrorMessage'

const MovieDetailPage = () => {
  const [movieDetail, setMovieDetail] = useState(null)
  const { id } = useParams()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [loading, setLoading] = useState(false)
  const [Error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true)
      try {
        const movieDetail = await movieService.getMovieById(id)
        setMovieDetail(movieDetail)
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error)
        setError(error.message || 'Error al obtener detalles de la película')
      } finally {
        setLoading(false)
      }
    }
    fetchMovieDetail()
  }, [id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : Error ? (
        <ErrorMessage message={Error} />
      ) : (
        <MovieDetail
          movieDetail={movieDetail}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </>
  )
}

export default MovieDetailPage
