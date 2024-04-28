const Cast = ({ castData }) => {
  return (
    <div className="flex gap-2 sm:flex-wrap overflow-auto">
      {castData.slice(0, 4).map((cast) => {
        const { name, id, profile_path } = cast;
        return (
          <div key={id} className="mt-3">
            <div className="rounded-lg overflow-hidden border border-zinc-700">
              <img
                className="h-28 w-28 sm:w-32 lg:w-24"
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              />
            </div>
            <div className="w-20 text-center text-zinc-300 truncate overflow-hidden mt-1 text-xs">
              {name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cast;
