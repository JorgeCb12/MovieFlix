const movieService = {
  getMovies: async (titleMovie) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=27f09df&s=${titleMovie}`
      )
      if (!response.ok) {
        throw new Error('Error al obtener películas')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  getMovieById: async (idMovie) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=27f09df&i=${idMovie}`
      )
      if (!response.ok) {
        throw new Error('Error al obtener película')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export default movieService
