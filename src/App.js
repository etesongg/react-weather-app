import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재위반 기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨 날씨상태가 있다.
// 3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const cities = ["Los Angeles", "New York", "Italy", "Seoul"];
  const KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.log("getWeatherByCity", error);
      setAPIError(error.message);
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <div className="container">
        {loading ? (
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        ) : !apiError ? (
          <>
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              setCity={setCity}
              selectedCity={city}
              handleCityChange={handleCityChange}
            />
          </>
        ) : (
          apiError
        )}
      </div>
    </div>
  );
}

export default App;
