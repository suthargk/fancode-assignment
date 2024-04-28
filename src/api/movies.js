const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const fetchMovies = async ({
  genreId,
  movies,
  year = 2012,
  setData,
  setIsLoading,
  initialMountRef,
}) => {
  setIsLoading(true);
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${genreId}`
    );
    const data = await response.json();
    if (data?.results.length) {
      setData({
        ...movies,
        [year]: data.results.sort((a, b) => b.popularity - a.popularity),
      });
    }

    setIsLoading(false);
    initialMountRef.current = false;
  } catch (error) {
    setIsLoading(false);
    initialMountRef.current = false;
  }
};

export const fetchMovie = async ({ movieId, setData, setIsLoading }) => {
  setIsLoading(true);
  try {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=2dca580c2a14b55200e784d157207b4d`
    );
    const genreData = await movieResponse.json();

    setData(genreData);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
  }
};

export const fetchMovieCast = async ({ movieId, setData, setIsLoading }) => {
  setIsLoading(true);
  try {
    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2dca580c2a14b55200e784d157207b4d&with_cast=""`
    );
    const castData = await castResponse.json();
    setData(castData?.cast || []);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
  }
};

export const searchMoviesAPI = async ({
  genreId,
  search,
  setData,
  setIsLoading,
}) => {
  setIsLoading(true);
  try {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2dca580c2a14b55200e784d157207b4d&query=${search}&sort_by=popularity.desc&page=1&vote_count.gte=100&with_genres=${genreId}`
    );
    const data = await movieResponse.json();

    if (data?.results.length) {
      setData((prev) => [...prev, ...data.results]);
    }

    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
  }
};
