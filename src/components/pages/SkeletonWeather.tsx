

const SkeletonWeather = () => {
  return (
    <div className="w-[100px] h-[150px] bg-black/20 rounded-2xl text-white">
      <div className="flex flex-col w-full h-full justify-center items-center gap-3">
        <h5 className="animate-pulse w-6 h-2"></h5>
        <div className="animate-pulse w-10 h-10"></div>
        <div className="flex justify-center items-center">
          <p className="text-xl animate-pulse w-6 h-2"></p>
          <p className="text-lg animate-pulse w-6 h-2"></p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonWeather;
