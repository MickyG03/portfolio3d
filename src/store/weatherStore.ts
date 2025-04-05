import { create } from 'zustand';
import { Weather } from '../types/weather';

interface WeatherState {
  currentWeather: Weather;
  autoUpdate: boolean;
  setWeather: (weather: Weather) => void;
  toggleAutoUpdate: () => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  currentWeather: 'sunny',
  autoUpdate: true,
  setWeather: (weather) => set({ currentWeather: weather }),
  toggleAutoUpdate: () => set((state) => ({ autoUpdate: !state.autoUpdate }))
}));