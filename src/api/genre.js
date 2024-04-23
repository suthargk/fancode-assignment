const fetchGenreList = async ({ setData, setIsLoading }) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d"
    );
    const data = await response.json();
    setData(data.genres);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
  }
};

export const fetchGenreMovies = async ({
  setData,
  setIsLoading,
  year,
  genreId,
  movies
}) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${genreId}`
    );
    const data = await response.json();
    setData({ ...movies, [year]: data.results });
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
  }
};

export default fetchGenreList;
