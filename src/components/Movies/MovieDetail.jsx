import SpinnerIcon from "../../assets/Icons/SpinnerIcon";
import StarIcon from "../../assets/Icons/StarIcon";
import Cast from "../Cast";
import CastSkeleton from "../Skeleton/CastSkeleton";
const MovieDetail = ({
  movieData,
  isMovieLoading,
  castData,
  isCastLoading,
  setIsMovieLoading,
  movieImg,
}) => {
  const {
    title,
    overview,
    genres,
    release_date,
    runtime,
    vote_average = 0,
  } = movieData;

  const duration = String((runtime / 60).toFixed(2)).split(".");
  const [hrs, minutes] = duration;
  const ratings = Math.round(vote_average / 2) || 0;

  return (
    <div className="overflow-auto font-saira bg-black h-full w-full ">
      {isMovieLoading ? (
        <div className="h-full w-full flex justify-center items-center animate-spin">
          <SpinnerIcon className="text-zinc-300 w-8 h-8" />
        </div>
      ) : (
        <>
          <img
            onLoad={() => setIsMovieLoading(false)}
            src={movieImg}
            className="w-full sm:w-[400px] md:w-[600px] sm:max-h-[400px] max-h-[350px] lg:object-contain"
          />

          <div className="p-4 flex flex-col gap-4">
            <div>
              <h2 className="text-white text-xl font-semibold">{title}</h2>
              <p className="text-gray-400 text-[10px]">
                Directed by: Christopher Nolan
              </p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="text-white rounded bg-zinc-800 w-fit text-xs px-3 py-0.5">
                  {release_date?.split("-")[0]}
                </div>
                <div className="text-white text-xs">
                  {hrs}h {minutes}m
                </div>
              </div>

              <div className="flex gap-1">
                {new Array(ratings).fill(null).map((item, index) => {
                  return (
                    <StarIcon
                      key={index}
                      id={index}
                      className="text-orange-400 w-4 h-4"
                    />
                  );
                })}
              </div>
            </div>
            <div className="text-zinc-300">{overview}</div>

            <div>
              <h3 className="text-white text-lg font-semibold">Genres</h3>

              <div className="flex gap-2 mt-2 flex-wrap">
                {genres.map((genre) => {
                  return (
                    <div
                      key={genre.id}
                      className="border min-w-fit	 border-zinc-700 px-3 py-0.5 text-white w-fit rounded-lg"
                    >
                      {genre.name}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">The Cast</h3>

              {isCastLoading ? <CastSkeleton /> : <Cast castData={castData} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
