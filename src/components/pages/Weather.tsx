import React from "react";
import {
  IoCloudyNight,
  IoSearchOutline,
  IoThunderstormSharp,
} from "react-icons/io5";
import { IoMdCloudy, IoMdSnow, IoMdSunny } from "react-icons/io";
import { MdFoggy, MdNightlight } from "react-icons/md";
import { format } from "date-fns";
import { AiOutlineEye } from "react-icons/ai";
import {
  FaCloudMoonRain,
  FaCloudSun,
  FaCloudSunRain,
  FaTemperatureQuarter,
} from "react-icons/fa6";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import Snowfall from "react-snowfall";
import { FormEvent, useEffect, useState } from "react";
import Spin from "./Spin";
import { IForecast, IWeather } from "../../types/weather";

import "react-toastify/ReactToastify.css";
import "../../i18n";
import { toast } from "react-toastify";
import { getWeather } from "../../service/weather";
import WeatherForecast from "./WeatherForecast";
import WeatherDaily from "./WeatherDaily";
const Weather = () => {
  const [location, setLocation] = useState("VietNam");
  const [data, setData] = useState<IWeather>({} as IWeather);
  const [isLoading, setLoading] = useState(false);
  //   console.log(process.env.REACT_APP_API_KEY);
  const [dataForecast, setDataForecast] = useState<IForecast[]>([]);
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          getWeather("weather", location),
          getWeather("forecast", location),
        ]);
        setDataForecast(forecastResponse?.list);
        setData(weatherResponse);
      } catch (error: any) {
        console.log("Error:", error);
        toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
        setLocation("VietNam");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  let icon;

  switch (data?.weather?.[0]?.icon) {
    case "01d":
      icon = <IoMdSunny size={70} className="text-yellow-300" />;
      break;
    case "01n":
      icon = <MdNightlight size={70} />;
      break;

    case "02d":
      icon = <FaCloudSun size={70} />;
      break;
    case "02n":
      icon = <IoCloudyNight size={70} />;
      break;
    case "03d":
      icon = <IoMdCloudy size={70} />;
      break;
    case "03n":
      icon = <IoCloudyNight size={70} />;
      break;
    case "04d":
      icon = <IoMdCloudy size={70} />;
      break;
    case "04n":
      icon = <IoCloudyNight size={70} />;
      break;
    case "50d":
      icon = <MdFoggy size={70} />;
      break;
    case "13d":
      icon = <IoMdSnow size={70} className="text-blue-300" />;
      break;
    case "09d":
      icon = <FaCloudMoonRain size={70} />;
      break;
    case "10d":
      icon = <FaCloudSunRain size={70} />;
      break;
    case "10n":
      icon = <FaCloudMoonRain size={70} />;
      break;
    case "11d":
      icon = <IoThunderstormSharp size={70} />;
      break;

    default:
      icon = <IoMdCloudy size={70} />;
      break;
  }
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MM/yyyy");
  //   const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [animate, setAnimate] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (searchTerm !== "") {
      setLocation(searchTerm);
      setSearchTerm("");
    }

    if (searchTerm === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
    e.preventDefault();
  };
  const dataTime = dataForecast?.filter((time: IForecast) => {
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return (
      time.dt_txt >= format(now, "yyyy-MM-dd HH:mm:ss") &&
      time.dt_txt <= format(next24Hours, "yyyy-MM-dd HH:mm:ss")
    );
  });

  const dataDaily = dataForecast?.filter((time: IForecast) => {
    return format(time.dt_txt, "HH:mm:ss") === "00:00:00";
  });
  console.log("dataDaily", dataDaily);

  // console.log(dataTime);

  return (
    <>
      <div className="relative w-full lg:h-screen h-full flex flex-col lg:flex-row gap-7 ">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat filter blur-[15px] -z-10"></div>
        <Snowfall />

        <div className="w-full  flex flex-col items-center justify-center gap-3 lg:px-0 px-5">
          <img src="/logo.svg" alt="" className="w-[180px] h-[60px]" />
          <form
            action=""
            className={`w-full max-w-[400px] bg-black/20 rounded-full min-h-[50px] ${
              animate ? "animate-shake" : "animate-none"
            }`}
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between h-full items-center p-2">
              <input
                type="text"
                className="bg-transparent flex-1 outline-none placeholder:text-white text-white h-full font-light pl-6"
                placeholder="Tìm kiếm thành phố"
                value={searchTerm}
                onChange={handleChange}
              />
              <button
                className="rounded-full w-20 h-11 bg-[#4cedf0] hover:bg-[#55e8ea] flex justify-center items-center"
                type="submit"
              >
                <IoSearchOutline size={20} />
              </button>
            </div>
          </form>
          <div className="w-full max-w-[400px] min-h-[420px] bg-black/20 rounded-2xl bg-opacity-5 text-white">
            {isLoading ? (
              <Spin />
            ) : (
              <div>
                <div className="flex items-center justify-start p-6 gap-5">
                  {icon}
                  <div className="flex flex-col items-start justify-start">
                    <h2 className="text-lg font-medium">
                      {data?.name} , {data?.sys?.country}
                    </h2>
                    <p className="text-xs font-medium">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-4 justify-center items-center">
                  <div className="flex justify-center items-center">
                    <p className="text-9xl">
                      {parseInt(data?.main?.temp.toString())}
                    </p>
                    <p className="text-5xl">°C</p>
                  </div>
                  <div className="pr-9">
                    <p>{data?.weather?.[0]?.description}</p>
                  </div>
                </div>
                <div className="flex flex-col pt-10 pb-4 gap-7">
                  <div className="flex justify-between px-8">
                    <div className="flex items-center gap-3">
                      <AiOutlineEye size={20} />
                      <p className="text-sm">
                        Visibility {data?.visibility / 1000 || 0} km
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaTemperatureQuarter size={20} />
                      <p className="text-sm">
                        Cảm giác {data?.main?.feels_like} °C{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between px-8">
                    <div className="flex items-center gap-3">
                      <WiHumidity size={20} />
                      <p className="text-sm">Độ ẩm {data?.main?.humidity} %</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <WiStrongWind size={20} />
                      <p className="text-sm">Gió {data?.wind?.speed} m/s</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center px-5">
          <WeatherForecast dataTime={dataTime} isLoading={isLoading} />
          <WeatherDaily dataTime={dataDaily} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Weather;
