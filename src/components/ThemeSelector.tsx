'use client';

import React from 'react';
import { useTheme, themes } from './ThemeProvider';
import Button from './Button';

export default function ThemeSelector() {
  const { setTheme, themeKey } = useTheme();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Choose Theme</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(themes).map(([key, theme]) => (
          <Button
            key={key}
            onClick={() => setTheme(key)}
            className={`
              px-4 py-2 rounded-lg transition-all duration-200
              ${themeKey === key 
                ? `${theme.primary} text-white shadow-lg scale-105` 
                : `${theme.secondary} ${theme.text} hover:${theme.primary} hover:text-white`
              }
            `}
          >
            {theme.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
