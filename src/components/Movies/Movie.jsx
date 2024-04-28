import StarIcon from "../../assets/Icons/StarIcon";

const Movie = ({ handleGetMovie, movie }) => {
  return (
    <div
      onClick={() => {
        handleGetMovie(
          movie.id,
          `https://image.tmdb.org/t/p/w400${movie.poster_path}`
        );
      }}
      className="cursor-pointer flex flex-col gap-2 text-white text-xs w-full"
    >
      <div className="aspect-square">
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          className="rounded w-full"
        />
      </div>
      <div>
        <h3>{movie.title}</h3>
        <div className="flex gap-2 items-center mt-1">
          <StarIcon className="text-indigo-500 w-3.5 h-3.5" />
          {movie.vote_average.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Movie;
