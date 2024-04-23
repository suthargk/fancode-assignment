import { useRef, useState } from "react";
import Header from "./components/Header";
import { useEffect } from "react";
import fetchGenreList from "./api/genre";
import Main from "./components/Main";
import fetchMovies from "./api/movies";
import Skeleton from "./components/Skeleton";

function App() {
  const [genres, setGenres] = useState([]);
  const [isGenreLoading, setIsGenreLoading] = useState(false);
  const [movies, setMovies] = useState({});
  const [isMoviesLoading, setIsMoviesLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(2012);
  const dateRef = useRef(new Date());
  const [activeGenreId, setActiveIdGenre] = useState("");
  const initialMountRef = useRef(true);

  const handleGenre = (genreId) => {
    setActiveIdGenre(genreId);
    setCurrentYear(2012);
    setMovies({});
    initialMountRef.current = true;
  };

  useEffect(() => {
    fetchGenreList({ setIsLoading: setIsGenreLoading, setData: setGenres });
  }, []);

  useEffect(() => {
    if (dateRef.current.getFullYear() + 1 === currentYear) {
      return;
    }
    fetchMovies({
      setIsLoading: setIsMoviesLoading,
      movies,
      genreId: activeGenreId,
      setData: setMovies,
      year: currentYear,
      initialMountRef,
    });
  }, [currentYear, activeGenreId]);

  return (
    <div className="font-saira bg-[#121212] overflow-hidden flex flex-col h-screen">
      <Header
        activeGenreId={activeGenreId}
        genres={genres}
        handleGenre={handleGenre}
      />

      {isMoviesLoading && initialMountRef.current ? (
        <Skeleton />
      ) : (
        <Main
          isMoviesLoading={isMoviesLoading}
          movies={movies}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          dateRef={dateRef}
          isGenreLoading={isGenreLoading}
        />
      )}
    </div>
  );
}

export default App;
