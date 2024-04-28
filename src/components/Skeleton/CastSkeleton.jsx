const CastSkeleton = () => {
  return (
    <div className="flex gap-2 mt-2">
      <div
        role="status"
        className="flex items-center justify-center h-28 w-28 sm:w-32 lg:w-24 bg-[#242424] rounded-lg animate-pulse"
      ></div>
      <div
        role="status"
        className="flex items-center justify-center h-28 w-28 sm:w-32 lg:w-24 bg-[#242424] rounded-lg animate-pulse"
      ></div>
      <div
        role="status"
        className="flex items-center justify-center h-28 w-28 sm:w-32 lg:w-24 bg-[#242424] rounded-lg animate-pulse"
      ></div>
      <div
        role="status"
        className="sm:flex md:hidden items-center justify-center h-28 w-28 sm:w-32 lg:w-24 bg-[#242424] rounded-lg animate-pulse"
      ></div>
    </div>
  );
};

export default CastSkeleton;
