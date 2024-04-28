import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Movies from "../Movies";
import { fetchMovie, fetchMovieCast } from "../../api/movies";
import { createPortal } from "react-dom";
import MovieDetail from "../Movies/MovieDetail";

const Main = ({ dateRef, setCurrentYear, currentYear, movies }) => {
  const movieYears = Object.keys(movies);
  const min = Math.min(...movieYears);
  const max = Math.max(...movieYears);
  const minYear = isFinite(min) ? min : currentYear;
  const maxYear = isFinite(max) ? max : currentYear;
  const containerRef = useRef(null);

  const topElementRef = useRef(null);
  const bottomElementRef = useRef(null);

  const [isMovieLoading, setIsMovieLoading] = useState(true);
  const [movieData, setMovieData] = useState({});
  const [castData, setCastData] = useState({});
  const [isCastLoading, setIsCastLoading] = useState(true);
  const [isMovieOverlayOpen, setIsMovieOverlayOpen] = useState(false);
  const movieImgRef = useRef(null);

  useLayoutEffect(() => {
    containerRef.current.scrollTo({ top: 10 });
  }, []);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      setCurrentYear(maxYear + 1);
    });

    if (bottomElementRef.current) {
      intersectionObserver.observe(bottomElementRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [maxYear]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      if (topElementRef.current) {
        setCurrentYear(minYear - 1);
      }
    });

    if (topElementRef.current) {
      intersectionObserver.observe(topElementRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, [minYear]);

  const handleGetMovie = async (movieId, movieImg) => {
    setIsMovieOverlayOpen(true);
    movieImgRef.current = movieImg;
    await fetchMovie({
      setIsLoading: setIsMovieLoading,
      setData: setMovieData,
      movieId,
    });

    fetchMovieCast({
      setIsLoading: setIsCastLoading,
      setData: setCastData,
      movieId,
    });
  };

  return (
    <div
      ref={containerRef}
      className="p-4 flex flex-col gap-8  h-full overflow-auto"
    >
      {createPortal(
        <div
          onClick={() => setIsMovieOverlayOpen(false)}
          className={`fixed ${
            isMovieOverlayOpen ? "top-0 left-0 right-0 bottom-0" : ""
          }`}
        >
          <div
            onClick={() => setIsMovieOverlayOpen(false)}
            className={`${
              isMovieOverlayOpen
                ? "right-0"
                : "invisible sm:-right-[300px] lg:-right-[600px] top-full sm:top-0"
            } w-full sm:w-[300px] lg:w-[600px] fixed right-0 top-0 h-full duration-500`}
          >
            <MovieDetail
              movieImg={movieImgRef.current}
              isMovieLoading={isMovieLoading}
              castData={castData}
              isCastLoading={isCastLoading}
              movieData={movieData}
              setIsMovieLoading={setIsMovieLoading}
            />
          </div>
        </div>,
        document.body
      )}
      <div className="flex flex-col">
        <div className="min-h-[500px] h-full relative">
          <div
            ref={movieYears.length ? topElementRef : null}
            className=" absolute top-[400px] left-0 w-full"
          ></div>
          {movieYears.map((year) => {
            return (
              <div key={year} className="mb-10">
                <h2 className="text-white text-lg font-semibold mb-3">
                  {year}
                </h2>
                <Movies handleGetMovie={handleGetMovie} movies={movies[year]} />
              </div>
            );
          })}
        </div>
        {dateRef.current.getFullYear() + 1 !== currentYear &&
        movieYears.length ? (
          <div ref={bottomElementRef} className="min-h-0"></div>
        ) : (
          <div className="text-center text-white">That's all folks</div>
        )}
      </div>
    </div>
  );
};

export default Main;
