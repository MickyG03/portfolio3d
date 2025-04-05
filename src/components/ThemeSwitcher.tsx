import { useState, useRef, useEffect } from 'react';
import { Sun, Sunset, Moon, Clock, ChevronDown } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { TimeOfDay } from '../types/theme';

export const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState('auto');
  const contentRef = useRef<HTMLDivElement>(null);
  const { currentTheme, autoUpdate, setTheme, toggleAutoUpdate, theme } = useThemeStore();

  const themes: { id: TimeOfDay; icon: JSX.Element; tooltip: string }[] = [
    { id: 'morning', icon: <Sun size={16} className="sm:w-5 md:w-6" />, tooltip: '6:00 AM - 1:59 PM' },
    { id: 'evening', icon: <Sunset size={16} className="sm:w-5 md:w-6" />, tooltip: '2:00 PM - 7:59 PM' },
    { id: 'night', icon: <Moon size={16} className="sm:w-5 md:w-6" />, tooltip: '8:00 PM - 5:59 AM' },
  ];

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? `${contentHeight}px` : '40px');
    }
  }, [isOpen]);

  const getCurrentTheme = () => themes.find(t => t.id === currentTheme);

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
            className="w-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center transition-all hover:bg-white/20 group relative"
            style={{ color: theme.colors.text }}
          >
            {getCurrentTheme()?.icon}
            <span className="absolute invisible group-hover:visible bg-black/75 text-white text-xs rounded px-2 py-1 left-full ml-2 whitespace-nowrap mario-font">
              {getCurrentTheme()?.tooltip}
            </span>
          </button>

          {themes.map(({ id, icon, tooltip }) => (
            <button
              key={id}
              onClick={() => {
                if (autoUpdate) toggleAutoUpdate();
                setTheme(id);
                setIsOpen(false);
              }}
              className={`w-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center transition-all opacity-0 group relative ${
                isOpen ? 'opacity-100' : ''
              } ${currentTheme === id ? 'bg-[rgba(255,228,196,0.25)]' : 'hover:bg-[rgba(255,228,196,0.15)]'}`}
              style={{ color: theme.colors.text }}
            >
              {icon}
              <span className="absolute invisible group-hover:visible bg-black/75 text-white text-xs rounded px-2 py-1 left-full ml-2 whitespace-nowrap mario-font">
                {tooltip}
              </span>
            </button>
          ))}
          <button
            onClick={() => {
              toggleAutoUpdate();
              setIsOpen(false);
            }}
            className={`w-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center transition-all opacity-0 group relative ${
              isOpen ? 'opacity-100' : ''
            } ${autoUpdate ? 'bg-[rgba(255,228,196,0.25)]' : 'hover:bg-[rgba(255,228,196,0.15)]'}`}
            style={{ color: theme.colors.text }}
          >
            <Clock size={16} className="sm:w-5 md:w-6" />
            <span className="absolute invisible group-hover:visible bg-black/75 text-white text-xs rounded px-2 py-1 left-full ml-2 whitespace-nowrap mario-font">
              Auto Update
            </span>
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