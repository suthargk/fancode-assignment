import { useEffect, useLayoutEffect, useRef } from "react";
import Movies from "../Movies";

const Main = ({ dateRef, setCurrentYear, currentYear, movies }) => {
  const movieYears = Object.keys(movies);
  const min = Math.min(...movieYears);
  const max = Math.max(...movieYears);
  const minYear = isFinite(min) ? min : currentYear;
  const maxYear = isFinite(max) ? max : currentYear;
  const containerRef = useRef(null);

  console.log("movieYears", movieYears);

  const topElementRef = useRef(null);
  const bottomElementRef = useRef(null);

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
      if (bottomElementRef.current) {
        intersectionObserver.unobserve(bottomElementRef.current);
      }
    };
  }, [maxYear]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      if (topElementRef.current) setCurrentYear(minYear - 1);
    });

    if (topElementRef.current) {
      intersectionObserver.observe(topElementRef.current);
    }

    return () => {
      if (topElementRef.current) {
        intersectionObserver.unobserve(topElementRef.current);
      }
    };
  }, [minYear]);

  return (
    <div
      ref={containerRef}
      className="p-4 flex flex-col gap-8  h-full overflow-auto"
    >
      <div className="flex flex-col">
        <div className="min-h-[500px] h-full relative">
          <div
            ref={movieYears.length ? topElementRef : null}
            className="min-h-100 absolute top-[400px] left-0 w-full"
          ></div>
          {movieYears.map((year) => {
            return (
              <div key={year} className="mb-4">
                <h2 className="text-white text-lg font-semibold mb-3">
                  {year}
                </h2>
                <Movies movies={movies[year]} />
              </div>
            );
          })}
        </div>

        {dateRef.current.getFullYear() + 1 !== currentYear &&
        movieYears.length ? (
          <div ref={bottomElementRef} className="min-h-0"></div>
        ) : null}
      </div>
    </div>
  );
};

export default Main;
