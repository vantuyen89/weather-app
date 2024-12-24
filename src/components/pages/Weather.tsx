import React from "react";
import axios from "axios";

import { BsCloudDrizzle, BsCloudHaze2Fill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import {
  IoMdCloudy,
  IoMdRainy,
  IoMdSnow,
  IoMdSunny,
  IoMdThunderstorm,
} from "react-icons/io";
import { MdFoggy } from "react-icons/md";
import { format } from "date-fns";
import { AiOutlineEye } from "react-icons/ai";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import Snowfall from "react-snowfall";
import { FormEvent, useEffect, useState } from "react";
import Spin from "./Spin";
import { IWeather } from "../../types/weather";
import { useTranslation } from "react-i18next";
import "react-toastify/ReactToastify.css";
import "../../i18n";
import { toast } from "react-toastify";
const Weather = () => {
  const [location, setLocation] = useState("VietNam");
  const [data, setData] = useState<IWeather>({} as IWeather);
  const [isLoading, setLoading] = useState(false);
  //   console.log(process.env.REACT_APP_API_KEY);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`
        );
        setData(data);
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

  switch (data?.weather?.[0]?.main) {
    case "Clouds":
      icon = <IoMdCloudy size={70} />;
      break;
    case "Rain":
      icon = <IoMdRainy size={70} />;
      break;
    case "Snow":
      icon = <IoMdSnow size={70} className="text-blue-300" />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill size={70} />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzle size={70} />;
      break;
    case "Clear":
      icon = <IoMdSunny size={70} className="text-yellow-300" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm size={70} />;
      break;
    case "Mist":
      icon = <MdFoggy size={70} />;
      break;
    case "Smoke":
      icon = <MdFoggy size={70} />;
      break;
    default:
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

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-r from-blue-200 to-cyan-200 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center gap-3">
        <Snowfall />
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
        <div className="w-full max-w-[400px] min-h-[500px] bg-black/20 rounded-2xl bg-opacity-5 text-white backdrop-blur-0">
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
              <div className="flex flex-col gap-3 p-8 justify-center items-center">
                {" "}
                <div className="flex justify-center items-center ">
                  <p className="text-9xl">
                    {parseInt(data?.main?.temp.toString())}
                  </p>
                  <p className="text-5xl">°C</p>
                </div>
                <div className="pr-9">
                  <p>{data?.weather?.[0]?.description}</p>
                </div>
              </div>
              <div className="flex flex-col pt-10 gap-7">
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
    </>
  );
};

export default Weather;
