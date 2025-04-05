import { Cloud, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';
import { useEffect } from 'react';
import { useWeatherStore } from '../store/weatherStore';
import { Weather } from '../types/weather';

export const WeatherSymbol = () => {
  const { currentWeather, autoUpdate, setWeather } = useWeatherStore();

  useEffect(() => {
    if (!autoUpdate) return;
    
    // Simulate weather changes every 30 seconds
    const interval = setInterval(() => {
      const weathers: Weather[] = ['cloudy', 'rainy', 'snowy', 'sunny', 'windy'];
      const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
      setWeather(randomWeather);
    }, 30000);

    return () => clearInterval(interval);
  }, [autoUpdate, setWeather]);

  const getWeatherIcon = () => {
    const iconProps = { size: 16, className: "sm:w-5 md:w-6 inline-block ml-2" };
    
    switch (currentWeather) {
      case 'cloudy':
        return <Cloud {...iconProps} />;
      case 'rainy':
        return <CloudRain {...iconProps} />;
      case 'snowy':
        return <CloudSnow {...iconProps} />;
      case 'sunny':
        return <Sun {...iconProps} />;
      case 'windy':
        return <Wind {...iconProps} />;
    }
  };

  return getWeatherIcon();
};