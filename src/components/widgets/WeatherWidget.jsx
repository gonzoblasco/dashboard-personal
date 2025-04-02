// src/components/widgets/WeatherWidget.jsx
import React, { useState, useEffect } from "react";
import Card from "../common/Card";
import { useUserPreferences } from "../../context/UserPreferencesContext";

const WeatherWidget = () => {
  const { preferences } = useUserPreferences();
  const { colors, theme } = preferences;
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Madrid");
  const [searchInput, setSearchInput] = useState("");

  // For demo purposes, this uses a mock API call
  // In a real app, you would use a real API key
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call
        setTimeout(() => {
          // Mock weather data based on city
          const mockWeatherData = getMockWeatherData(city);
          setWeatherData(mockWeatherData);
          setIsLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError("Error fetching weather data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  // Mock data generator function
  const getMockWeatherData = (cityName) => {
    const cities = {
      "Madrid": {
        temp: 27,
        condition: "sunny",
        humidity: 50,
        windSpeed: 12,
        forecast: [
          { day: "Hoy", temp: 27, condition: "sunny" },
          { day: "Mañana", temp: 28, condition: "partly-cloudy" },
          { day: "Miércoles", temp: 30, condition: "sunny" },
          { day: "Jueves", temp: 26, condition: "rainy" }
        ]
      },
      "Barcelona": {
        temp: 24,
        condition: "partly-cloudy",
        humidity: 65,
        windSpeed: 15,
        forecast: [
          { day: "Hoy", temp: 24, condition: "partly-cloudy" },
          { day: "Mañana", temp: 23, condition: "cloudy" },
          { day: "Miércoles", temp: 25, condition: "partly-cloudy" },
          { day: "Jueves", temp: 22, condition: "rainy" }
        ]
      },
      "Valencia": {
        temp: 29,
        condition: "sunny",
        humidity: 45,
        windSpeed: 8,
        forecast: [
          { day: "Hoy", temp: 29, condition: "sunny" },
          { day: "Mañana", temp: 31, condition: "sunny" },
          { day: "Miércoles", temp: 28, condition: "partly-cloudy" },
          { day: "Jueves", temp: 27, condition: "partly-cloudy" }
        ]
      },
      "Bilbao": {
        temp: 19,
        condition: "rainy",
        humidity: 80,
        windSpeed: 18,
        forecast: [
          { day: "Hoy", temp: 19, condition: "rainy" },
          { day: "Mañana", temp: 18, condition: "rainy" },
          { day: "Miércoles", temp: 20, condition: "cloudy" },
          { day: "Jueves", temp: 22, condition: "partly-cloudy" }
        ]
      },
      "Sevilla": {
        temp: 34,
        condition: "sunny",
        humidity: 30,
        windSpeed: 6,
        forecast: [
          { day: "Hoy", temp: 34, condition: "sunny" },
          { day: "Mañana", temp: 35, condition: "sunny" },
          { day: "Miércoles", temp: 33, condition: "sunny" },
          { day: "Jueves", temp: 32, condition: "partly-cloudy" }
        ]
      },
      "default": {
        temp: 25,
        condition: "cloudy",
        humidity: 60,
        windSpeed: 10,
        forecast: [
          { day: "Hoy", temp: 25, condition: "cloudy" },
          { day: "Mañana", temp: 26, condition: "partly-cloudy" },
          { day: "Miércoles", temp: 24, condition: "rainy" },
          { day: "Jueves", temp: 27, condition: "sunny" }
        ]
      }
    };

    return cities[cityName] || cities["default"];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput("");
    }
  };

  // Helper to get weather icon
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} fill={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" />
            <path d="M12 2V4" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M12 20V22" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M4.93 4.93L6.34 6.34" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M17.66 17.66L19.07 19.07" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M2 12H4" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M20 12H22" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M6.34 17.66L4.93 19.07" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M19.07 4.93L17.66 6.34" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "rainy":
        return (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 19V21" stroke={theme === 'dark' ? '#8CB4DB' : '#4682B4'} strokeWidth="2" strokeLinecap="round" />
            <path d="M16 19V21" stroke={theme === 'dark' ? '#8CB4DB' : '#4682B4'} strokeWidth="2" strokeLinecap="round" />
            <path d="M12 19V23" stroke={theme === 'dark' ? '#8CB4DB' : '#4682B4'} strokeWidth="2" strokeLinecap="round" />
            <path d="M20 15.7776C21.2144 15.1044 22 13.7156 22 12.1436C22 9.93981 20.2091 8.14893 18.0053 8.14893C18.0018 8.14893 17.9983 8.14894 17.9948 8.14896C17.8729 6.20599 16.6917 4.55975 15.0402 3.67677C13.3887 2.7938 11.3464 2.79473 9.69586 3.67964C8.04533 4.56456 6.86591 6.21227 6.74613 8.15586C4.47146 8.29811 2.67766 10.2322 2.66966 12.5204C2.66166 14.8086 4.43921 16.7564 6.71251 16.916" stroke={theme === 'dark' ? '#B0C4DE' : '#6A8EAE'} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "cloudy":
        return (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 6C6.46243 6 4 8.46243 4 11.5C4 14.5376 6.46243 17 9.5 17H18C20.2091 17 22 15.2091 22 13C22 10.7909 20.2091 9 18 9C18 6.79086 16.2091 5 14 5C12.1866 5 10.6389 6.10343 10.1314 7.70035C9.92273 7.65138 9.71277 7.625 9.5 7.625C7.35863 7.625 5.625 9.35863 5.625 11.5C5.625 13.6414 7.35863 15.375 9.5 15.375H18C19.3807 15.375 20.5 14.2557 20.5 12.875C20.5 11.4943 19.3807 10.375 18 10.375C18 8.99429 16.8807 7.875 15.5 7.875" stroke={theme === 'dark' ? '#B0C4DE' : '#6A8EAE'} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "partly-cloudy":
        return (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="3" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} fill={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" />
            <path d="M8 3V4" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M3 8H4" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M11.5 8H12.5" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M8 11.5V12.5" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M5.63603 5.63603L4.92893 4.92893" stroke={theme === 'dark' ? '#FFD700' : '#FF9800'} strokeWidth="2" strokeLinecap="round" />
            <path d="M9.5 6C6.46243 6 4 8.46243 4 11.5C4 14.5376 6.46243 17 9.5 17H18C20.2091 17 22 15.2091 22 13C22 10.7909 20.2091 9 18 9C18 6.79086 16.2091 5 14 5C12.1866 5 10.6389 6.10343 10.1314 7.70035C9.92273 7.65138 9.71277 7.625 9.5 7.625C7.35863 7.625 5.625 9.35863 5.625 11.5C5.625 13.6414 7.35863 15.375 9.5 15.375H18C19.3807 15.375 20.5 14.2557 20.5 12.875C20.5 11.4943 19.3807 10.375 18 10.375C18 8.99429 16.8807 7.875 15.5 7.875" stroke={theme === 'dark' ? '#B0C4DE' : '#6A8EAE'} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 6C6.46243 6 4 8.46243 4 11.5C4 14.5376 6.46243 17 9.5 17H18C20.2091 17 22 15.2091 22 13C22 10.7909 20.2091 9 18 9C18 6.79086 16.2091 5 14 5C12.1866 5 10.6389 6.10343 10.1314 7.70035C9.92273 7.65138 9.71277 7.625 9.5 7.625C7.35863 7.625 5.625 9.35863 5.625 11.5C5.625 13.6414 7.35863 15.375 9.5 15.375H18C19.3807 15.375 20.5 14.2557 20.5 12.875C20.5 11.4943 19.3807 10.375 18 10.375C18 8.99429 16.8807 7.875 15.5 7.875" stroke={theme === 'dark' ? '#B0C4DE' : '#6A8EAE'} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // Styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const searchBoxStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px'
  };

  const inputStyle = {
    flex: 1,
    padding: '8px 12px',
    border: `1px solid ${theme === 'dark' ? '#555' : '#ddd'}`,
    borderRadius: '4px',
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333'
  };

  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: colors.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const currentWeatherStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
    border: theme === 'dark' ? '1px solid #444' : 'none'
  };

  const tempStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: theme === 'dark' ? '#ffffff' : '#333'
  };

  const cityStyle = {
    fontSize: '18px',
    marginBottom: '8px',
    color: theme === 'dark' ? '#ffffff' : '#666'
  };

  const detailsStyle = {
    fontSize: '14px',
    color: theme === 'dark' ? '#e0e0e0' : '#777'
  };

  const forecastStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const forecastItemStyle = {
    flexBasis: 'calc(25% - 8px)',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
    textAlign: 'center',
    border: theme === 'dark' ? '1px solid #444' : 'none',
  };

  const forecastDayStyle = {
    fontWeight: 'bold',
    marginBottom: '4px',
    fontSize: '14px',
    color: theme === 'dark' ? '#ffffff' : '#666'
  };

  const forecastTempStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#ffffff' : '#333'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '16px',
    color: theme === 'dark' ? '#ffffff' : '#666'
  };

  const errorStyle = {
    color: colors.warning,
    padding: '16px',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundColor: theme === 'dark' ? '#3a2a2a' : '#fff5f5'
  };

  return (
    <Card title="Pronóstico del Tiempo">
      <div style={containerStyle}>
        <form onSubmit={handleSearch} style={searchBoxStyle}>
          <input 
            type="text" 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar ciudad..." 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Buscar</button>
        </form>

        {isLoading ? (
          <div style={loadingStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Cargando pronóstico...
          </div>
        ) : error ? (
          <div style={errorStyle}>{error}</div>
        ) : weatherData ? (
          <>
            <div style={currentWeatherStyle}>
              <div>
                {getWeatherIcon(weatherData.condition)}
              </div>
              <div>
                <div style={tempStyle}>{weatherData.temp}°C</div>
                <div style={cityStyle}>{city}</div>
                <div style={detailsStyle}>
                  Humedad: {weatherData.humidity}% | Viento: {weatherData.windSpeed} km/h
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: '8px', color: theme === 'dark' ? '#ccc' : '#666' }}>Pronóstico de 4 días</h4>
              <div style={forecastStyle}>
                {weatherData.forecast.map((day, index) => (
                  <div key={index} style={forecastItemStyle}>
                    <div style={forecastDayStyle}>{day.day}</div>
                    <div>{getWeatherIcon(day.condition)}</div>
                    <div style={forecastTempStyle}>{day.temp}°</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={loadingStyle}>No se encontraron datos</div>
        )}

        <div style={{ fontSize: '12px', color: theme === 'dark' ? '#777' : '#999', textAlign: 'center', marginTop: '8px' }}>
          Prueba buscar: Madrid, Barcelona, Valencia, Bilbao, Sevilla
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;