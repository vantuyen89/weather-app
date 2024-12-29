import { IForecast } from "../../types/weather";
import { format } from "date-fns";
import { IoMdCloudy, IoMdSnow, IoMdSunny } from "react-icons/io";
import { MdFoggy, MdNightlight } from "react-icons/md";
import { IoCloudyNight, IoThunderstormSharp } from "react-icons/io5";
import { FaCloudMoonRain, FaCloudSun, FaCloudSunRain } from "react-icons/fa6";
import SkeletonWeather from "./SkeletonWeather";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props {
  dataTime: IForecast[];
  isLoading: boolean;
}
const WeatherForecast = ({ dataTime, isLoading }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-white font-semibold tracking-wider lg:text-3xl text-2xl py-8">
        Thời tiết những giờ tới
      </h3>
      <ScrollArea className="w-full h-full">
        <div className="flex gap-5 w-max">
          {dataTime.map((time: IForecast) => {
            let icon;
            switch (time?.weather?.[0]?.icon) {
              case "01d":
                icon = <IoMdSunny size={40} className="text-yellow-300" />;
                break;
              case "01n":
                icon = <MdNightlight size={40} />;
                break;
              case "02d":
                icon = <FaCloudSun size={40} />;
                break;
              case "02n":
                icon = <IoCloudyNight size={40} />;
                break;
              case "03d":
                icon = <IoMdCloudy size={40} />;
                break;
              case "03n":
                icon = <IoCloudyNight size={40} />;
                break;
              case "04d":
                icon = <IoMdCloudy size={40} />;
                break;
              case "04n":
                icon = <IoCloudyNight size={40} />;
                break;
              case "50d":
                icon = <MdFoggy size={40} />;
                break;
              case "13d":
                icon = <IoMdSnow size={40} className="text-blue-300" />;
                break;
              case "09d":
                icon = <FaCloudMoonRain size={40} />;
                break;
              case "10d":
                icon = <FaCloudSunRain size={40} />;
                break;
              case "10n":
                icon = <FaCloudMoonRain size={40} />;
                break;
              case "11d":
                icon = <IoThunderstormSharp size={40} />;
                break;

              default:
                icon = <IoMdCloudy size={40} />;
                break;
            }

            return isLoading ? (
              <SkeletonWeather />
            ) : (
              <div
                className="w-[100px] min-w-[100px] h-[150px] bg-black/20 rounded-2xl text-white cursor-pointer"
                key={time?.dt_txt}
              >
                <div className="flex flex-col w-full h-full justify-center items-center gap-3">
                  <h5>{format(time.dt_txt, "dd/MM HH'h'")}</h5>
                  {icon}
                  <div className="flex justify-center items-center">
                    <p className="text-xl">
                      {parseInt(time?.main?.temp.toString())}
                    </p>
                    <p className="text-lg">°C</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-3">
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
    </div>
  );
};

export default WeatherForecast;
