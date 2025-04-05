export type TimeOfDay = 'morning' | 'evening' | 'night';

export interface ThemeColors {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

export interface Theme {
  colors: ThemeColors;
  fogColor: string;
  fogDensity: number;
  ambientLight: string;
}