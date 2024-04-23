const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const fetchMovies = async ({
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
    setData({ ...movies, [year]: data.results });
    setIsLoading(false);
    initialMountRef.current = false;
  } catch (error) {
    setIsLoading(false);
    initialMountRef.current = false;
  }
};

export default fetchMovies;
