import Movie from "./Movie";

const Movies = ({ handleGetMovie, movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-auto	gap-4">
      {movies.map((movie) => {
        return (
          <Movie
            handleGetMovie={handleGetMovie}
            key={movie.id}
            movie={movie}
          />
        );
      })}
    </div>
  );
};

export default Movies;
