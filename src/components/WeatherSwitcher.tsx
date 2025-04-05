import { useState, useRef, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Clock, ChevronDown } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';
import { Weather } from '../types/weather';
import { useThemeStore } from '../store/themeStore';

export const WeatherSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState('auto');
  const contentRef = useRef<HTMLDivElement>(null);
  const { currentWeather, autoUpdate, setWeather, toggleAutoUpdate } = useWeatherStore();
  const { theme } = useThemeStore();

  const weathers: { id: Weather; icon: JSX.Element }[] = [
    { id: 'sunny', icon: <Sun size={16} className="sm:w-5 md:w-6" /> },
    { id: 'cloudy', icon: <Cloud size={16} className="sm:w-5 md:w-6" /> },
    { id: 'rainy', icon: <CloudRain size={16} className="sm:w-5 md:w-6" /> },
    { id: 'snowy', icon: <CloudSnow size={16} className="sm:w-5 md:w-6" /> },
    { id: 'windy', icon: <Wind size={16} className="sm:w-5 md:w-6" /> },
  ];

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? `${contentHeight}px` : '40px');
    }
  }, [isOpen]);

  const getCurrentWeather = () => weathers.find(w => w.id === currentWeather);

  return (
    <div className="relative w-[40px] sm:w-[44px] md:w-[48px]">
      <div
        ref={contentRef}
        className="overflow-hidden absolute right-0 top-0 z-20 w-full transition-all duration-300 ease-in-out rounded-full"
        style={{
          height,
          background: 'rgba(255, 228, 196, 0.15)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 6px rgba(255, 167, 127, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center transition-all hover:bg-white/20"
            style={{ color: theme.colors.text }}
          >
            {getCurrentWeather()?.icon}
          </button>

          {weathers.map(({ id, icon }) => (
            <button
              key={id}
              onClick={() => {
                if (autoUpdate) toggleAutoUpdate();
                setWeather(id);
                setIsOpen(false);
              }}
              className={`w-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center transition-all opacity-0 ${
                isOpen ? 'opacity-100' : ''
              } ${currentWeather === id ? 'bg-[rgba(255,228,196,0.25)]' : 'hover:bg-[rgba(255,228,196,0.15)]'}`}
              style={{ color: theme.colors.text }}
            >
              {icon}
            </button>
          ))}
          <button
            onClick={() => {
              toggleAutoUpdate();
              setIsOpen(false);
            }}
            className={`w-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center transition-all opacity-0 ${
              isOpen ? 'opacity-100' : ''
            } ${autoUpdate ? 'bg-[rgba(255,228,196,0.25)]' : 'hover:bg-[rgba(255,228,196,0.15)]'}`}
            style={{ color: theme.colors.text }}
          >
            <Clock size={16} className="sm:w-5 md:w-6" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center transition-all hover:bg-[rgba(255,228,196,0.15)]"
            style={{ color: theme.colors.text }}
          >
            <ChevronDown
              size={12}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};