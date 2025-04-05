import { ReactNode, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface PopupProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const Popup = ({ 
  children, 
  isOpen, 
  onClose,
  position = 'center'
}: PopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4 origin-top-right';
      case 'top-left':
        return 'top-4 left-4 origin-top-left';
      case 'bottom-right':
        return 'bottom-4 right-4 origin-bottom-right';
      case 'bottom-left':
        return 'bottom-4 left-4 origin-bottom-left';
      default:
        return 'top-[50vh] left-1/2 -translate-y-[50%] -translate-x-1/2 origin-center';
    }
  };

  const getBackdropStyle = () => {
    switch (currentTheme) {
      case 'morning':
      case 'evening':
        return 'bg-white/30';
      case 'night':
        return 'bg-black/20';
    }
  };

  const getPopupStyle = () => {
    switch (currentTheme) {
      case 'morning':
        return 'bg-[rgba(255,228,196,0.25)]';
      case 'evening':
        return 'bg-[rgba(255,228,196,0.30)]';
      default: // night
        return 'bg-[rgba(255,228,196,0.35)]';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 z-40 backdrop-blur-sm
          transition-all duration-500 ease-in-out
          ${getBackdropStyle()}
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Popup */}
      <div 
        className={`
          fixed z-50 ${getPositionClasses()}
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isOpen ? 'scale-100 opacity-100 translate-y-[-50%]' : 'scale-95 opacity-0 translate-y-[-45%]'}
        `}
      >
        <div 
          className={`
            relative rounded-lg overflow-hidden
            ${getPopupStyle()}
            backdrop-blur-md
            shadow-[0_4px_6px_rgba(255,167,127,0.1),inset_0_1px_2px_rgba(255,255,255,0.1)]
            border border-[rgba(255,228,196,0.2)]
            transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            transform-gpu
          `}
        >
          <button
            onClick={onClose}
            className="
              absolute top-2 right-2 p-1
              text-[rgba(255,228,196,0.8)]
              hover:text-[rgba(255,228,196,1)]
              transition-colors duration-300
              rounded-full
              hover:bg-[rgba(255,228,196,0.1)]
            "
          >
            <X size={16} />
          </button>
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};