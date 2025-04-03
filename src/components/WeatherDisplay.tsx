import { AirPollutionData, WeatherData } from "../types/type";

interface WeatherDataProps {
  weatherData: WeatherData | null;
  airpollutionData: AirPollutionData | null;
}

const WeatherDisplay = ({
  weatherData,
  airpollutionData,
}: WeatherDataProps) => {
  if (!weatherData) {
    return null;
  }
  const getAirQualityText = (aqi: number) => {
    const quality = ["매우좋음", "좋음", "보통", "나쁨", "매우나쁨"];
    return quality[aqi - 1] || "정보없음";
  };

  return (
    <div className=" bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-2xl w-full max-w-lg mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">
        {weatherData.name}
      </h2>
      <div className="flex items-center justify-center mb-6">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="w-24 h-24"
        />
        <div className="text-6xl font-bold text-gray-800 ml-4">
          {Math.round(weatherData.main.temp)}°C
        </div>
      </div>
      <p className="text-xl text-gray-600 mb-4">
        {weatherData.weather[0].description}
      </p>

      <div className="grid grid-cols-2 gap-4 text-gray-600">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm">습도</p>
          <p className="text-2xl font-bold">{weatherData.main.humidity}%</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm">대기질</p>
          <p className="text-2xl font-bold">
            {getAirQualityText(airpollutionData?.list[0]?.main?.aqi)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
