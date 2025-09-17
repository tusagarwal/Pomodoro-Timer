'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export const themes: Record<string, Theme> = {
  red: {
    name: 'Classic Red',
    primary: 'bg-red-500',
    secondary: 'bg-red-100',
    accent: 'bg-red-600',
    background: 'bg-red-50',
    text: 'text-red-800',
  },
  blue: {
    name: 'Ocean Blue',
    primary: 'bg-blue-500',
    secondary: 'bg-blue-100',
    accent: 'bg-blue-600',
    background: 'bg-blue-50',
    text: 'text-blue-800',
  },
  green: {
    name: 'Forest Green',
    primary: 'bg-green-500',
    secondary: 'bg-green-100',
    accent: 'bg-green-600',
    background: 'bg-green-50',
    text: 'text-green-800',
  },
  purple: {
    name: 'Royal Purple',
    primary: 'bg-purple-500',
    secondary: 'bg-purple-100',
    accent: 'bg-purple-600',
    background: 'bg-purple-50',
    text: 'text-purple-800',
  },
  orange: {
    name: 'Sunset Orange',
    primary: 'bg-orange-500',
    secondary: 'bg-orange-100',
    accent: 'bg-orange-600',
    background: 'bg-orange-50',
    text: 'text-orange-800',
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeKey: string) => void;
  themeKey: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKey] = useState('red');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('pomodoro-theme');
    if (savedTheme && themes[savedTheme]) {
      setThemeKey(savedTheme);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pomodoro-theme', themeKey);
  }, [themeKey]);

  const setTheme = (newThemeKey: string) => {
    if (themes[newThemeKey]) {
      setThemeKey(newThemeKey);
    }
  };

  const currentTheme = themes[themeKey];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeKey }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
