import { IForecast } from "../../types/weather";
import { format } from "date-fns";
import { IoMdCloudy, IoMdSnow, IoMdSunny } from "react-icons/io";
import { MdFoggy } from "react-icons/md";
import {  IoThunderstormSharp } from "react-icons/io5";
import {  FaCloudRain, FaCloudSunRain } from "react-icons/fa6";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface Props {
  dataTime: IForecast[];
  isLoading: boolean;
}
const WeatherDaily = ({ dataTime, isLoading }: Props) => {
  return (
    <div className="flex flex-col pb-5 ">
      <h3 className="text-white font-semibold tracking-wider lg:text-3xl text-2xl py-8">
        Thời tiết những ngày tới
      </h3>
      <ScrollArea className="w-full h-full">
        <div className="flex gap-5 w-max">
          {dataTime.map((time: IForecast) => {
            let icon;
            switch (time?.weather?.[0]?.main) {
              case "Clear":
                icon = <IoMdSunny size={40} className="text-yellow-300" />;
                break;
              case "Clouds":
                icon = <IoMdCloudy size={40} />;
                break;
              case "Atmosphere":
                icon = <MdFoggy size={40} />;
                break;
              case "Snow":
                icon = <IoMdSnow size={40} className="text-blue-300" />;
                break;
              case "Rain":
                icon = <FaCloudRain size={40} />;
                break;
              case "Drizzle":
                icon = <FaCloudSunRain size={40} />;
                break;
              case "Thunderstorm":
                icon = <IoThunderstormSharp size={40} />;
                break;

              default:
                icon = <IoMdCloudy size={40} />;
                break;
            }

            return (
              <>
                {isLoading ? (
                  <p>isLoading</p>
                ) : (
                  <div className="w-[100px] min-w-[100px] h-[150px] bg-black/20 rounded-2xl text-white cursor-pointer">
                    <div className="flex flex-col w-full h-full justify-center items-center gap-3">
                      <h5>{format(time.dt_txt, "dd/MM")}</h5>
                      {icon}
                      <div className="flex justify-center items-center">
                        <p className="text-xl">
                          {parseInt(time?.main?.temp.toString())}
                        </p>
                        <p className="text-lg"> °C</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
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

export default WeatherDaily;
