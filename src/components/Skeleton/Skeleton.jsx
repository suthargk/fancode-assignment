const Skeleton = () => {
  const skeletonLength = new Array(8).fill(null);
  return (
    <div className="p-4">
      <div className="h-5 bg-[#242424] rounded-full w-full mb-4 animate-pulse"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-auto gap-4">
        {skeletonLength.map((skeletom, index) => {
          return (
            <div
              key={index}
              role="status"
              className="flex items-center justify-center h-56 sm:h-64 md:h-72 lg:h-84 max-w-sm bg-[#242424] rounded-lg animate-pulse"
            >
              <span className="sr-only">Loading...</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skeleton;
