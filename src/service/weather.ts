import axios from "axios";

export const getWeather = async (weather: string, location: string) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/${weather}?q=${location}&units=metric&appid=${process.env.API_KEY}`
  );
  return data;
};
