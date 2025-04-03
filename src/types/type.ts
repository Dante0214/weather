export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}
export interface AirPollutionData {
  list: {
    main: {
      aqi: number;
    };
  }[];
}
export interface WeatherParams {
  city?: string;
  lat?: number;
  lon?: number;
}
