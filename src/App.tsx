import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Scene } from './components/Scene';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { WeatherSwitcher } from './components/WeatherSwitcher';
import { WeatherSymbol } from './components/WeatherSymbol';
import { useThemeStore } from './store/themeStore';
import { Theme } from './types/theme';
import { Popup } from './components/Popup';
import { MessageSquare } from 'lucide-react';

function App() {
  const { theme, updateTimeOfDay } = useThemeStore();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);
  const [targetTheme, setTargetTheme] = useState<Theme>(theme);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setTargetTheme(theme);
    const transition = () => {
      setCurrentTheme(prev => ({
        ...prev,
        colors: {
          background: theme.colors.background,
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
          accent: theme.colors.accent,
          text: theme.colors.text,
        },
        fogColor: theme.fogColor,
        fogDensity: prev.fogDensity + (theme.fogDensity - prev.fogDensity) * 0.1,
        ambientLight: theme.ambientLight,
      }));
    };
    
    const intervalId = setInterval(transition, 50);
    return () => clearInterval(intervalId);
  }, [theme]);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Update time of day every minute
    const themeInterval = setInterval(updateTimeOfDay, 60000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(themeInterval);
    };
  }, [updateTimeOfDay]);

  return (
    <div 
      className="w-full h-screen relative" 
      style={{ 
        background: currentTheme.colors.background,
        transition: 'background 2s ease-in-out'
      }}
    >
      {/* Top left content */}
      <div 
        className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-10"
        style={{ 
          color: currentTheme.colors.text,
          transition: 'color 2s ease-in-out'
        }}
      >
        <h1 className="mario-font text-base sm:text-lg md:text-xl lg:text-2xl mb-2">Mitesh</h1>
        <p className="flex items-center gap-2">
          <span className="time-font text-[12px] sm:text-sm md:text-base font-bold">{time}</span>
          <WeatherSymbol />
        </p>
      </div>

      {/* Switchers */}
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-10 flex gap-4">
        <ThemeSwitcher />
        <WeatherSwitcher />
      </div>

      {/* Popup Test Button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="absolute bottom-4 right-4 z-10 p-3 rounded-full transition-all duration-300
          bg-[rgba(255,228,196,0.15)] backdrop-blur-md
          shadow-[0_4px_6px_rgba(255,167,127,0.1),inset_0_1px_2px_rgba(255,255,255,0.1)]
          border border-[rgba(255,228,196,0.2)]
          hover:bg-[rgba(255,228,196,0.25)]"
        style={{ color: currentTheme.colors.text }}
      >
        <MessageSquare size={20} />
      </button>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="center">
        <div className="w-64 sm:w-80" style={{ color: currentTheme.colors.text }}>
          <h2 className="mario-font text-lg mb-4">Welcome!</h2>
          <p className="text-sm mb-3">
            This is a test popup with a blurred background and smooth animations.
          </p>
          <p className="text-sm">
            You can customize the content and position of this popup component.
          </p>
        </div>
      </Popup>

      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ transition: 'all 2s ease-in-out' }}
      >
        <fog attach="fog" args={[currentTheme.fogColor, 0, 30]} />
        <ambientLight intensity={0.5} color={currentTheme.ambientLight} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Scene />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default App;