import { useRef, useState } from "react";
import Header from "./components/Header";
import { useEffect } from "react";
import fetchGenreList from "./api/genre";
import Main from "./components/Main";
import { fetchMovies } from "./api/movies";
import Skeleton from "./components/Skeleton/Skeleton";

function App() {
  const [genres, setGenres] = useState([]);
  const [isGenreLoading, setIsGenreLoading] = useState(false);
  const [movies, setMovies] = useState({});
  const [isMoviesLoading, setIsMoviesLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(2012);
  const dateRef = useRef(new Date());
  const [selectedGenres, setSelectedGenres] = useState([]);
  const initialMountRef = useRef(true);
  const [isAllKeywordSelected, setIsAllKeywordSelected] = useState(false);

  const handleGenreSelect = (genre) => {
    let updatedGenres;
    if (genre === "All") {
      setIsAllKeywordSelected(!isAllKeywordSelected);
      if (!isAllKeywordSelected) {
        updatedGenres = [...genres.map((genre) => genre.id)];
      } else {
        updatedGenres = [];
      }
    } else {
      updatedGenres = selectedGenres.includes(genre)
        ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
        : [...selectedGenres, genre];
      setIsAllKeywordSelected(updatedGenres.length === genres.length);
    }
    setSelectedGenres(updatedGenres);
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
      genreId: selectedGenres.length === genres.length ? "" : selectedGenres,
      setData: setMovies,
      year: currentYear,
      initialMountRef,
    });
  }, [currentYear, selectedGenres]);

  console.log("currentYear", currentYear);
  return (
    <div className="font-saira bg-[#121212] overflow-hidden flex flex-col h-screen">
      <Header
        selectedGenres={selectedGenres}
        genres={genres}
        isGenreLoading={isGenreLoading}
        handleGenreSelect={handleGenreSelect}
        isAllKeywordSelected={isAllKeywordSelected}
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
