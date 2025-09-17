/*
 * Timer Display Component
 * 
 * This component displays the current timer countdown in MM:SS format
 * Features:
 * - Large, easy-to-read display
 * - Formats time in minutes and seconds
 * - Visual feedback for different timer states
 * - Responsive design
 */

import React from 'react';
import { useTheme } from './ThemeProvider';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
  isRunning?: boolean;
  mode?: 'work' | 'break' | 'longBreak';
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  minutes, 
  seconds, 
  isRunning = false,
  mode = 'work'
}) => {
  const { currentTheme } = useTheme();
  
  // Format numbers to always show two digits
  const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Mode Label */}
      <div className="mb-4">
        <span className={`text-sm font-medium uppercase tracking-wide ${currentTheme.text}`}>
          {mode === 'work' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
        </span>
      </div>
      
      {/* Timer Display */}
      <div className={`
        relative
        flex items-center justify-center
        w-80 h-80
        text-8xl font-mono font-bold
        border-8 rounded-full
        ${currentTheme.text} border-opacity-30
        ${isRunning ? 'animate-pulse' : ''}
        bg-white shadow-2xl
        border-current
      `}>
        <div className="text-center">
          <span>{formatTime(minutes)}</span>
          <span className="mx-2">:</span>
          <span>{formatTime(seconds)}</span>
        </div>
        
        {/* Running indicator */}
        {isRunning && (
          <div className="absolute -top-2 -right-2">
            <div className={`w-4 h-4 ${currentTheme.primary} rounded-full animate-pulse`}></div>
          </div>
        )}
      </div>
      
      {/* Progress visualization */}
      <div className="mt-6 w-80">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${currentTheme.primary}`}
            style={{ 
              width: `${((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
