import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { AirPollutionData, WeatherData, WeatherParams } from "./types/type";
import { getAirPollutionData, getWeatherData } from "./api/api";
import Loading from "./components/Loading";
import WeatherDisplay from "./components/WeatherDisplay";
import CityButton from "./components/CityButton";
const defaultCities = [
  { display: "현재 위치", value: "now" },
  { display: "서울", value: "seoul" },
  { display: "도쿄", value: "tokyo" },
  { display: "바르셀로나", value: "barcelona" },
  { display: "시드니", value: "sydney" },
  { display: "방콕", value: "bangkok" },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airpollutionData, setAirpollutionData] =
    useState<AirPollutionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);

  const handleSearch = async ({ city, lat, lon }: WeatherParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWeatherData({ city, lat, lon });
      setWeatherData(data);
      const airData = await getAirPollutionData(data.coord.lon, data.coord.lat);
      setAirpollutionData(airData);
      setIsCurrentLocation(!!lat && !!lon);
    } catch (error) {
      setError("날씨 정보를 불러오는데 실패했습니다.");
      setWeatherData(null);
      setAirpollutionData(null);
    }
    setIsLoading(false);
  };

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("이 브라우저는 위치 정보를 지원하지 않습니다."));
      }
    });
  };

  const handleCitySelect = async (city: string) => {
    if (city === "now") {
      try {
        const position = await getCurrentLocation();
        const { latitude: lat, longitude: lon } = position.coords;
        handleSearch({ lat, lon });
      } catch (error) {
        console.error("위치를 찾을 수 없습니다", error);
        setError("위치를 찾을 수 없습니다");
      }
    } else {
      handleSearch({ city });
    }
  };
  useEffect(() => {
    const initWeather = async () => {
      try {
        const position = await getCurrentLocation();
        const { latitude: lat, longitude: lon } = position.coords;
        await handleSearch({ lat, lon });
      } catch (error) {
        console.log("위치정보를 찾을 수 없어 서울로 설정합니다");
        await handleSearch({ city: "seoul" });
      }
    };
    initWeather();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div>
        {error && (
          <div className="bg-red-100/90 rounded-md p-4 mb-4 text-center text-red-600">
            {error}
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <WeatherDisplay
            weatherData={weatherData}
            airpollutionData={airpollutionData}
          />
        )}
        <SearchBar onSearch={(city) => handleSearch({ city })} />
        <CityButton
          city={defaultCities}
          onCitySelect={handleCitySelect}
          currentCity={weatherData?.name}
          isCurrent={isCurrentLocation}
        />
      </div>
    </div>
  );
}
export default App;
