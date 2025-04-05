import { create } from 'zustand';
import { TimeOfDay, Theme } from '../types/theme';

const themes: Record<TimeOfDay, Theme> = {
  morning: {
    colors: {
      background: 'linear-gradient(135deg, #d3d3d3 0%, #878787 100%)',
      primary: '#878787',
      secondary: '#d3d3d3',
      accent: '#000000',
      text: '#000000'
    },
    fogColor: '#d3d3d3',
    fogDensity: 0.01,
    ambientLight: '#ffffff'
  },
  evening: {
    colors: {
      background: 'linear-gradient(135deg, #878787 0%, #5e5e5e 100%)',
      primary: '#5e5e5e',
      secondary: '#878787',
      accent: '#000000',
      text: '#000000'
    },
    fogColor: '#878787',
    fogDensity: 0.02,
    ambientLight: '#9e9e9e'
  },
  night: {
    colors: {
      background: 'linear-gradient(135deg, #5e5e5e 0%, #363636 100%)',
      primary: '#363636',
      secondary: '#5e5e5e',
      accent: '#ffffff',
      text: '#ffffff'
    },
    fogColor: '#363636',
    fogDensity: 0.03,
    ambientLight: '#424242'
  }
};

interface ThemeState {
  currentTheme: TimeOfDay;
  theme: Theme;
  autoUpdate: boolean;
  updateTimeOfDay: () => void;
  setTheme: (theme: TimeOfDay) => void;
  toggleAutoUpdate: () => void;
}

const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 14) return 'morning';
  if (hour >= 14 && hour < 20) return 'evening';
  return 'night';
};

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: getTimeOfDay(),
  theme: themes[getTimeOfDay()],
  autoUpdate: true,
  updateTimeOfDay: () => {
    set((state) => {
      if (!state.autoUpdate) return state;
      const timeOfDay = getTimeOfDay();
      return { currentTheme: timeOfDay, theme: themes[timeOfDay] };
    });
  },
  setTheme: (timeOfDay) => set({ currentTheme: timeOfDay, theme: themes[timeOfDay] }),
  toggleAutoUpdate: () => set((state) => ({ autoUpdate: !state.autoUpdate }))
}));