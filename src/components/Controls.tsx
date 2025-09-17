/*
 * Timer Controls Component
 * 
 * This component provides the main control buttons for the Pomodoro timer
 * Features:
 * - Start/Pause toggle button
 * - Reset button
 * - Skip button for breaks
 * - Clean, intuitive interface with icons
 */

import React from 'react';
import Button from './Button';

interface ControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
  onSkip?: () => void;
  disabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({ 
  isRunning, 
  onStartPause, 
  onReset, 
  onSkip,
  disabled = false 
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Start/Pause Button */}
      <Button
        variant="primary"
        onClick={onStartPause}
        disabled={disabled}
        className="px-8 py-3 text-lg flex items-center gap-2"
      >
        {isRunning ? (
          <>
            {/* Pause Icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            Pause
          </>
        ) : (
          <>
            {/* Play Icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                clipRule="evenodd" 
              />
            </svg>
            Start
          </>
        )}
      </Button>

      {/* Reset Button */}
      <Button
        variant="default"
        onClick={onReset}
        disabled={disabled}
        className="px-6 py-3 flex items-center gap-2"
      >
        {/* Reset Icon */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
        Reset
      </Button>

      {/* Skip Button (optional) */}
      {onSkip && (
        <Button
          variant="default"
          onClick={onSkip}
          disabled={disabled}
          className="px-6 py-3 flex items-center gap-2"
        >
          {/* Skip Icon */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Skip
        </Button>
      )}
    </div>
  );
};

export default Controls;
