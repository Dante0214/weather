import { AirPollutionData, WeatherData } from "../types/type";

interface WeatherDataProps {
  weatherData: WeatherData | null;
  airpollutionData: AirPollutionData | null;
}
const dust: { [key: number]: string } = {
  1: "매우좋음",
  2: "좋음",
  3: "보통",
  4: "나쁨",
  5: "매우나쁨",
} as const;
const WeatherDisplay = ({
  weatherData,
  airpollutionData,
}: WeatherDataProps) => {
  if (!weatherData) {
    return null;
  }
  if (!airpollutionData) {
    return null;
  }
  return (
    <div className=" text-center p-4 ">
      <h2 className="text-4xl font-bold mb-4">{weatherData.name}</h2>
      <p className="text-lg">{weatherData.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
        alt="Weather Icon"
        className="mx-auto"
      />
      <p className="text-xl">온도: {weatherData.main.temp}°C</p>
      <p className="text-xl">
        미세먼지: {dust[airpollutionData?.list[0]?.main?.aqi] ?? "데이터 없음"}
      </p>
    </div>
  );
};

export default WeatherDisplay;
