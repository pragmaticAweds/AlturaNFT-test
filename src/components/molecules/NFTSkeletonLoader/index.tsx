const NFTSkeletonLoader = () => {
  return (
    <div className="bg-white shadow-md flex flex-col rounded-t-xl h-[22rem]">
      <div className="h-[80%] w-full rounded-t-xl bg-gray-300 animate-pulse"></div>
      <div className="h-[20%] flex flex-col justify-between w-full py-2 px-3">
        <div className="w-full flex justify-between gap-x-4">
          <span className="h-5 w-[80%] rounded bg-gray-300 animate-pulse"></span>
          <span className="h-5 w-1/4 rounded bg-gray-300 animate-pulse"></span>
        </div>
        <div className="w-full flex justify-between gap-x-4">
          <span className="h-5 w-[60%] rounded bg-gray-300 animate-pulse"></span>
          <span className="h-5 w-1/5 rounded bg-gray-300 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

export default NFTSkeletonLoader;
