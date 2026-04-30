import { create } from 'zustand';

type ThemeType =
  | 'light'
  | 'dark'
  | 'ocean'
  | 'forest'
  | 'sunset';

type ThemeStore = {
  currentTheme: ThemeType;

  setTheme: (theme: ThemeType) => void;
};

export const useThemeStore = create<ThemeStore>(
  (set) => ({
    currentTheme: 'ocean',

    setTheme: (theme) =>
      set({
        currentTheme: theme,
      }),
  })
);