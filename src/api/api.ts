import { AirPollutionData, WeatherData, WeatherParams } from "../types/type";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherData = async ({
  city,
  lon,
  lat,
}: WeatherParams): Promise<WeatherData> => {
  const response = await axios.get(API_URL, {
    params: {
      q: city ?? undefined,
      lat: lat ?? undefined,
      lon: lon ?? undefined,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};
export const getAirPollutionData = async (
  lon: number,
  lat: number
): Promise<AirPollutionData> => {
  const response = await axios.get(
    "http://api.openweathermap.org/data/2.5/air_pollution",
    {
      params: {
        lon: lon,
        lat: lat,
        appid: API_KEY,
      },
    }
  );
  return response.data;
};
