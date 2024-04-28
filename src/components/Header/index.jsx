import { useState } from "react";

const Header = ({
  genres,
  isAllKeywordSelected,
  selectedGenres,
  handleGenreSelect,
  setMovies,
}) => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  return (
    <div className="bg-[#242424] p-4 pt-2">
      <div className="flex justify-between">
        <h1 className="text-[#F0283C] font-bold text-2xl uppercase inline-block">
          MovieFlix
        </h1>
      </div>
      <div className="relative">
        {isLeftVisible ? (
          <div className="absolute -left-1 top-0 h-full w-10  bg-gradient-to-r from-[#242424e6] to-[#4848482b]"></div>
        ) : null}

        {isRightVisible ? (
          <div className="absolute -right-1 top-0 h-full w-10 bg-gradient-to-l from-[#242424e6] to-[#4848482b]"></div>
        ) : null}
        <div
          className="flex gap-2 overflow-auto mt-4"
          onScroll={(element) => {
            const elementRect = element.target.getBoundingClientRect();

            setIsRightVisible(() => {
              return !(
                element.target.scrollWidth - 1 <=
                Math.trunc(element.target.scrollLeft + elementRect.width)
              );
            });

            setIsLeftVisible(() => {
              return (
                Math.trunc(element.target.scrollLeft + elementRect.width) !==
                Math.trunc(elementRect.width)
              );
            });
          }}
        >
          <button
            onClick={() => {
              handleGenreSelect("All");
            }}
            className={`${
              isAllKeywordSelected ? "bg-[#F0283C]" : "bg-[#484848]"
            } min-w-fit rounded text-sm font-normal px-3 py-1  text-[#F5F5F5]`}
          >
            All
          </button>
          {genres.map((genre) => {
            return (
              <button
                key={genre.id}
                onClick={() => {
                  handleGenreSelect(genre.id);
                }}
                className={`${
                  selectedGenres.includes(genre.id)
                    ? "bg-[#F0283C]"
                    : "bg-[#484848]"
                } min-w-fit rounded text-sm font-normal px-3 py-1 text-[#F5F5F5]`}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
